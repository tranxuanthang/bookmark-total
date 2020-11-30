import { hash } from './hash.js'
import difference from 'lodash/fp/difference'

export const diffIndex = (indexA, indexB) => {
  const keysA = Array.from(indexA.keys())
  const keysB = Array.from(indexB.keys())

  return difference(keysA, keysB)
}

export const missingLocalIds = (remoteIndex, localIndex) => {
  return diffIndex(remoteIndex, localIndex)
}

export const missingRemoteIds = (remoteIndex, localIndex) => {
  return diffIndex(localIndex, remoteIndex)
}

export const genNode = (rawNode) => {
  const genListNode = (listNode) => {
    return listNode.map((node) => {
      return genNode(node)
    })
  }

  return {
    id: rawNode.url ? hash(rawNode.url) : hash(rawNode.title),
    title: rawNode.title,
    index: rawNode.index,
    url: rawNode.url,
    type: rawNode.url ? 'bookmark' : 'folder',
    deleted: false,
    children: rawNode.children ? genListNode(rawNode.children) : null
  }
}

export const genIndex = (parentNode) => {
  const gen = (node, parentPath, map) => {
    const path = parentPath !== null ? `${parentPath}/${node.id}` : node.id
    map.set(node.id, {
      title: node.title,
      index: node.index,
      url: node.url,
      type: node.type,
      deleted: false,
      path
    })

    if (node.children) {
      node.children.forEach((childNode) => {
        gen(childNode, path, map)
      })
    }
  }

  const map = new Map()

  gen(parentNode, null, map)

  return new Map([...map].sort())
}
