<template>
  <draggable
    v-model="list"
    class="dragArea list-group"
    :class="{ isDrag }"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !isDrag ? 'flip-list' : null,
    }"
    :group="group"
    v-bind="{ ...dragOptions, ...$attrs }"
    :item-key="itemKey"
    @start="isDrag = true"
    @end="dropDown"
  >
    <!-- 定义每个拖拽过来的组件的展示方式 -->
    <template #item="item">
      <div
        :class="{ 'item-drag': item.element.draggable, 'item-contain': showItemContain }"
        :data-el="item.element.draggable"
      >
        <slot name="item" v-bind="item"> </slot>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
  /**
   * @name: draggable-transition-group
   * @author:卜启缘
   * @date: 2021/5/1 23:15
   * @description：draggable-transition-group
   * @update: 2021/5/1 23:15
   */
  import { computed } from 'vue';
  import draggable from 'vuedraggable';
  import { useVModel } from '@vueuse/core';

  defineOptions({
    name: 'DraggableTransitionGroup',
  });

  const props = defineProps({
    moduleValue: {
      type: Array,
      default: () => [],
    },
    drag: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: '_vid',
    },
    group: {
      type: Object,
      default: () => ({ name: 'components' }),
    },
    fallbackClass: String,
    parentlocation: {
      type: Object,
    },
    showItemContain: {
      type: Boolean,
      default: false,
    },
  });
  // 默认情况下v-model都是使用modelValue作为prop，并以update:modelValue 作为对应的事件
  // 但可以通过自定义绑定参数进行修改: v-model:drag, update:drag则为对应的事件
  const emit = defineEmits(['update:moduleValue', 'update:drag']);

  const list = useVModel(props, 'moduleValue', emit);
  const isDrag = useVModel(props, 'drag', emit);

  const dragOptions = computed(() => ({
    animation: 200,
    disabled: false,
    scroll: true,
    ghostClass: 'ghost',
  }));
  const dropDown = (e) => {
    isDrag.value = false;
    if (e.to?.classList.contains('!min-h-680px')) {
      console.log('放下', e);
      // 移动前后鼠标与目标之间的距离保持一致
      const initLocation = { x: 0, y: 0 };
      initLocation.x = e.originalEvent.clientX - props.parentlocation?.x;
      initLocation.y = e.originalEvent.clientY - props.parentlocation?.y;
      const target = e.item;
      console.log('item', target);
      // 设置target的样式
      target.style.left = `${e.originalEvent.layerX}px`;
      target.style.top = `${e.originalEvent.layerY}px`;
      console.log('init', props.parentlocation);
      // console.log('location', initLocation);
      // console.log('div', getComputedStyle(target).position);
    }
  };
</script>

<style lang="scss" scoped>
  @import './func.scss';

  .item-contain {
    position: absolute;
    display: block;
    width: fit-content;
    height: fit-content;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    background: #c8ebfb;
    opacity: 0.5;
  }

  .list-group {
    height: 100%;
    // min-height: 40px;
    position: relative;

    // &.isDrag div[data-draggable='true'] {
    //   padding: 2px 0;
    // }

    &.isDrag:not(.no-child) :deep(.list-group-item.has-slot) {
      @include showContainerBorder;
    }
  }
</style>
