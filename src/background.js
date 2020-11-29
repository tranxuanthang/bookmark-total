const getBookmarksTree = async () => {
  return await browser.bookmarks.getTree()
}

browser.runtime.onMessage.addListener((request, sender) => {
  if (request.name === 'bookmarks/getTree') {
    return new Promise(async (resolve, reject) => {
      const bookmarks = await getBookmarksTree()
      resolve(bookmarks)
    })
  }
})
