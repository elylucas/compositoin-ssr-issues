# Composition SSR Issue Repo

This repo demonstrates a few issues that pop up when using composition API with
SSR (NextJS in this case).

## Add .env.local file

First, create a .env.local file and update the params with a Space that has
composition enabled:

```
NEXT_PUBLIC_ENVIRONMENT_ID=master
NEXT_PUBLIC_SPACE_ID=yours
NEXT_PUBLIC_ACCESS_TOKEN=yours
NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=yours
NEXT_PUBLIC_HOST=https://cdn.contentful.com
NEXT_PUBLIC_PREVIEW_HOST=https://preview.contentful.com
```

## Add an experience page

Add an experience page with the slug of `testpage` and add the Card component to
the page.

## Run app and see errors

Open the `pages/index.tsx` file and follow along the commented steps:

- Step 1: Load the page as is and see the window.location error

This is presumably because the `defineComponent` call is being run on the
server, which doesn't have a window object.

- Step 2: Comment out the `defineComponent` call and see the window.location
  error goes away, but now you get a hydration error

This might not be a big issue, but something I saw come up.

- Step 3: Comment out the default `Home` export and uncomment the dynamic export
  and see they hydration error go way

The hydration error goes away now presumably because all the rendering is now
being done on the client. However, since the `defineComponent` call is still
commented out, nothing appears on the screen

- Step 4: Uncomment the `defineComponent` call above and see the page render as
  it should

Page is rendering now, but using with no SSR happening.
