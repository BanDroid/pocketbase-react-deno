module.exports = {
  renderReact: (options) => {
    const html = options.template
      .loadFiles(
        `${options.hooksDir}/app/layout/default.html`,
        ...(options.templateFiles ? options.templateFiles : [])
      )
      .render({
        ...options.data,
        locals: JSON.stringify(
          { status: options.status || 200, ...options.data } || {}
        ),
      });

    return options.event.html(options.status || 200, html);
  },
};
