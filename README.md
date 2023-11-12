This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# About the exercise
## Steps followed
1. Fork a vercel's repo with a basic template. Remove unnecessary stuff.
2. Create the mock Products service
3. Create a basic Products page
4. Implement a basic horizontal drag and drop for Products page
5. Create multiple rows of draggable Products page
6. Buttons to add and remove rows in Products page
7. Draggable rows in Products page
8. Limit the number of items per row in Products page
9. Buttons to add items to the row
10. Create the `/templates` endpoint and service
11. Create templates selector button
12. Zoom functionality to Products Page
 - I found a bug in the `beautiful-drag-n-drop` functionality that does not allow for scaled items to be dragged around. I decided to disable the feature while scaling.
13. Create the `/grids` endpoint to POST grids and to GET grids