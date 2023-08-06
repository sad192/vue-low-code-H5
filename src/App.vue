<template>
  <!-- 提供全局配置选项 -->
  <el-config-provider :locale="zhCn">
    <!-- 获取router-view组件内部默认插槽定义的props参数 -->
    <router-view #="{ Component, route }">
      <!--切换的组件会从DOM树上卸载，is接收一个已注册的组件名或则组件对象 -->
      <component :is="Component" :key="route.path" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { provide } from 'vue';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import { initVisualData, injectKey, localKey } from '@/visual-editor/hooks/useVisualData';

  const visualData = initVisualData();
  // 注入可视化编辑器所有配置，全局保存一份唯一的对象数据
  provide(injectKey, visualData);

  const { jsonData } = visualData;

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(localKey, JSON.stringify(jsonData));
  });
</script>

<style lang="scss">
  @import 'style/common';
</style>
