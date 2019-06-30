
export const changeActiveServer = (id, focusServer) => {
  const oldNode = document.querySelector(".active-server");
  if (oldNode) {
    oldNode.classList.remove("active-server")
  }
  
  focusServer(id);
}
