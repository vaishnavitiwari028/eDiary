function enableDynamicRouting(mainRouting) {
  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    let currentPath = location.pathname;
    mainRouting(currentPath);
  });
}

function enableRouting(routes) {
  return (url, ...viewProps) => {
    history.pushState({}, "", url);
    let currentPath = location.pathname;
    const match = routes.find((route) => route.path === currentPath);
    if (match) {
      let view = new match.view(...viewProps);
      return view;
    }
  };
}

function enableLinks(mainRouting) {
  document.querySelectorAll("[data-route]").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.href) {
        mainRouting(e.target.href);
      } else {
        let to = e.target.getAttribute("to");
        mainRouting(to);
      }
    });
  });
}

export { enableRouting, enableDynamicRouting, enableLinks };
