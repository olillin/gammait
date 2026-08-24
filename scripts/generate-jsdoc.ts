import { Node, Project, SyntaxKind } from 'ts-morph'

const gammaDocsUrl = 'https://gamma-docs.olillin.com'
const gammaDocsRepo = 'olillin/gamma-docs'
const gammaDocsBranch = 'main'

const project = new Project({
    tsConfigFilePath: './tsconfig.json',
    skipFileDependencyResolution: true,
    skipLoadingLibFiles: true,
})

const excludedPaths = ['/api#types']

const sourceCache: Record<string, string> = {}

async function getGammaDocs(path: string): Promise<string> {
    if (Object.hasOwn(sourceCache, path)) {
        return sourceCache[path]
    }

    const url = gammaDocsUrl + path
    // const url = `https://raw.githubusercontent.com/${gammaDocsRepo}/refs/heads/${gammaDocsBranch}/docs${path}.md`
    const text = await fetch(url).then(result => result.text())

    sourceCache[path] = text
    return text
}

/**
 * Remove HTML tags and join into one line.
 */
function cleanHtmlString(text: string): string {
    const pattern = /<\w+(?: .+?)?>(.+?)<\/\w+>/s
    let match = text.match(pattern)
    while (match != null) {
        const start = match.index!
        const end = start + match[0].length
        const newContent = match[1].match(/^\d+$/) ? '' : match[1]
        text = text.slice(0, start) + newContent + text.slice(end)
        match = text.match(pattern)
    }
    return text.replaceAll('\n', ' ').replaceAll(/  +/g, ' ')
}

async function processComment(comment: Node): Promise<void> {
    const see = comment.getChildrenOfKind(SyntaxKind.JSDocSeeTag)[0]
    if (see === undefined) return

    const urlPattern = new RegExp(
        `\{@link ${RegExp.escape(gammaDocsUrl)}(\/[^ ]+) ?(.+?)?\}`
    )
    const urlMatch = see.getText().match(urlPattern)
    if (!urlMatch) return
    const url = urlMatch[1].replace(/\/(?=($|#))/, '')
    if (excludedPaths.includes(url)) return
    const [urlPath, urlHeading] = url.split('#', 2)

    const doc = await getGammaDocs(urlPath)

    // Get description
    const descriptionPattern = urlHeading
        ? new RegExp(
              `id="${RegExp.escape(urlHeading)}".*?>(.+?)<.*?<p.*?>(.+?)<\/p>`,
              's'
          )
        : /<p(?: .*?)?>(.+?)<\/p>/s
    const descriptionMatch = doc.match(descriptionPattern)
    if (!descriptionMatch) return
    const rawHeading = urlHeading ? descriptionMatch[1] : undefined
    const heading = rawHeading ? cleanHtmlString(rawHeading) : undefined
    const rawDescription = urlHeading
        ? descriptionMatch[2]
        : descriptionMatch[1]
    const description = cleanHtmlString(rawDescription)

    // Get other tags
    const otherTags = comment
        .getChildren()
        .filter(node => node.getText().match(/^@(?!see)/))
        .map(node => '\n * ' + node.getText().split('\n')[0])
        .join('')

    // Get title
    const titlePattern = /<title>(.+?)<\/title>/
    const titleMatch = doc.match(titlePattern)
    if (!titleMatch) return
    const rawTitle = titleMatch[1]
    const [pageName, siteName] = rawTitle.split('-', 2).map(s => s.trim())
    const title = pageName + (heading ? '#' + heading : '') + ' - ' + siteName

    const newContent =
        '/**\n * ' +
        description +
        otherTags +
        `\n * @see {@link ${gammaDocsUrl}${url} ${title}}\n */`
    comment.replaceWithText(newContent)
}

async function main() {
    const sourceFiles = project.getSourceFiles()
    for (const sourceFile of sourceFiles) {
        const nodes = sourceFile.getDescendantsOfKind(SyntaxKind.JSDoc)
        for (const node of nodes) {
            await processComment(node)
        }
    }

    await project.save()
    console.log('Done')
}

main()
