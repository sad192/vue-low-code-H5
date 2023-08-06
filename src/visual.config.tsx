import { createVisualEditorConfig } from './visual-editor/visual-editor.utils';
import baseWidgets from '@/packages/base-widgets';
import containerComponent from '@/packages/container-component';
// 返回一个管理注册组件的对象
export const visualConfig = createVisualEditorConfig();
// 注册基础控件
Object.entries(baseWidgets).forEach(([name, widget]) =>
  // moduleName key componet
  visualConfig.registry('baseWidgets', name, widget),
);
// 注册容器组件
Object.entries(containerComponent).forEach(([name, widget]) =>
  visualConfig.registry('containerComponents', name, widget),
);

console.log(
  `%c成功加载组件数量:${Object.keys(visualConfig.componentMap).length}`,
  'color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;',
);

console.log('visualConfig:', visualConfig);
