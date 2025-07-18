/// <reference path="../pb_data/types.d.ts" />

// create route for homepage using default template
// or you could create another in pb_hooks/app/layout and configure your custom head or something for SEO.
routerAdd("GET", "/{$}", (event) => {
  const utils = require(`${__hooks}/utils.js`);
  return utils.renderReact({
    event,
    template: $template,
    hooksDir: __hooks,
    // this data is what being send to your react app, it will be available as window.locals property.
    data: {
      title: "Beranda",
    },
  });
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
      // 404 status means the route is not exist,
      // just send default template and react router will handle the browser route for you.
      return utils.renderReact({
        event,
        template: $template,
        hooksDir: __hooks,
        // this data will also send status code so your react app could determine statuscode from server too.
        data: {
          title: "PocketReact",
          status,
        },
      });
    }
    throw error;
  }
});
