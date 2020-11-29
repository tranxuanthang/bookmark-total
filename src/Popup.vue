<template>
  <BookmarkTreeNode v-for="(node, index) in bookmarkTree.children" :node="node"></BookmarkTreeNode>
</template>

<script>
import { ref, onMounted } from 'vue'
import BookmarkTreeNode from './components/BookmarkTreeNode.vue'

export default {
  components: { BookmarkTreeNode },

  setup () {
    const bookmarkTree = ref([])

    const getBookmarkTree = async () => {
      const result = await browser.runtime.sendMessage({
        name: 'bookmarks/getTree'
      })
      bookmarkTree.value = result[0]
      console.log(bookmarkTree.value)
    }

    onMounted(getBookmarkTree)

    return {
      bookmarkTree,
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
