// Native details/summary handles toggling and keyboard activation without JavaScript.
// Add dismissal and ensure only one header panel is open in older browsers too.
const headerControls = document.querySelector('.ivme-controls');
if (headerControls) {
  const panels = [...headerControls.querySelectorAll('details')];
  for (const panel of panels) {
    panel.addEventListener('toggle', () => {
      if (panel.open) {
        for (const other of panels) if (other !== panel) other.open = false;
      }
    });
  }
  document.addEventListener('click', (event) => {
    for (const panel of panels) if (!panel.contains(event.target)) panel.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openPanel = panels.find((panel) => panel.open);
    if (openPanel) {
      openPanel.open = false;
      openPanel.querySelector('summary').focus();
    }
  });
}
