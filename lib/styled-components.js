const styled = {
  setStyle: function (styles) {
    return function (content, tag) {
      if (tag === "img") {
        return `<img style="${styles}" src=${content} />`
      }

      return `
          <${tag} style="${styles}">
              ${content}
          </${tag}>
      `
    }
  },
}

export default styled
