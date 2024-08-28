import ContextMenu from '@imengyu/vue3-context-menu';

const iconStyle = {
  fill: 'var(--color-text)',
  width: '0.8em',
  height: '0.8em',
};

function showContextMenu(e, menuItems) {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: menuItems,
    theme: 'flat dark',
  });
};

export {
  iconStyle,
  showContextMenu,
};
