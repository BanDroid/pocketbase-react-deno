/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/{$}", (event) => {
  const utils = require(`${__hooks}/utils.js`);
  return utils.renderReact({
    event,
    template: $template,
    hooksDir: __hooks,
    data: {
      title: "Home",
    },
  });
});

routerAdd("GET", "/redirect/{$}", (event) => {
  event.redirect(301, "/");
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
