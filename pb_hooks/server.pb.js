/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/{$}", (event) => {
  const utils = require(`${__hooks}/utils.js`);
  return utils.renderReact({
    event,
    template: $template,
    hooksDir: __hooks,
    data: {
      title: "Beranda",
    },
  });
});

routerAdd("GET", "/posts/{$}", (event) => {
  event.redirect(301, "/");
});

routerAdd("GET", "/posts/{id}", (event) => {
  const utils = require(`${__hooks}/utils.js`);
  const id = event.request.pathValue("id");
  try {
    const record = $app.findRecordById("tasks", id);
    return utils.renderReact({
      event,
      template: $template,
      hooksDir: __hooks,
      data: {
        title: record.getString("task"),
        task: record.publicExport(),
      },
    });
  } catch (error) {
    return utils.renderReact({
      event,
      template: $template,
      hooksDir: __hooks,
      data: {
        title: "Task not found",
        status: error.value?.status || 404,
      },
    });
  }
});

routerUse((event) => {
  const utils = require(`${__hooks}/utils.js`);
  try {
    event.next();
  } catch (error) {
    const status = error.value?.status;
    if (status == 400) {
      return event.next();
    } else if (status > 400) {
      return utils.renderReact({
        event,
        template: $template,
        hooksDir: __hooks,
        data: {
          title: "PocketReact",
          status,
        },
      });
    }
    throw error;
  }
});
