<template>
  <div>
    <div class="font-bold">{{ node.title }}</div>
    <div class="ml-4">
      <BookmarkTreeNode v-for="(childNode, index) in node.children" :node="childNode"></BookmarkTreeNode>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'

export default {
  name: 'BookmarkTreeNode',
  props: {
    node: {
      type: Object
    }
  },
  setup(props) {
    const { node } = toRefs(props)
    return {
      node
    }
  }
}

</script>
