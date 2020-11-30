<template>
  <div class="p-4 font-mono text-xs bg-gray-100 rounded-lg">{{ bookmarksJson }}</div>

  <BookmarkTreeNode v-for="(node, index) in bookmarkTree.children" :node="node"></BookmarkTreeNode>
</template>

<script>
import { ref, onMounted } from 'vue'
import BookmarkTreeNode from './components/BookmarkTreeNode.vue'
import { genNode, genIndex, diffIndex } from './utils/common.js'

export default {
  components: { BookmarkTreeNode },

  setup () {
    const bookmarkTree = ref([])
    const bookmarksJson = ref('')

    const getBookmarkTree = async () => {
      const result = await browser.runtime.sendMessage({
        name: 'bookmarks/getTree'
      })
      bookmarkTree.value = result[0]
      const parentNode = genNode(bookmarkTree.value)
      const indexNode = genIndex(parentNode)
      const diffNode = diffIndex(indexNode, indexNode)
      console.log(parentNode)
      console.log(indexNode)
      console.log(diffNode)

      bookmarksJson.value = JSON.stringify(parentNode)
    }

    onMounted(getBookmarkTree)

    return {
      bookmarkTree,
      bookmarksJson,
      getBookmarkTree
    }
  }
}
</script>

<style>
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
</style>
