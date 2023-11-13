export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start m-24 gap-8">
      <div className="gap-6 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This is a coding exercise for a job application.
        </p>
        <div className="bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 min-w-[200px] justify-center"
            rel="noopener noreferrer"
          >
            By Soldeveloper with 💙
          </span>
        </div>
      </div>
      <ul className="gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          The photo, name, and price of each product must be visible at all times.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          As many rows as desired can be created as long as there are elements in the row.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          Rows must have between 1 and 3 elements.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          Users must be able to add elements to rows and exchange them between different created rows or between the elements of the same row using drag and drop.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          Users must be able to move rows of position.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          You can zoom in and out on the grid editor. If you add many rows, you lose the context of how the grid would look. Zoom makes it easy to see the maximum number of rows possible. This zoom should only be done on the editor area and not on the entire page, so you **cannot** use the native browser zoom.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          A template can be associated and disassociated with a row.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          Users must see the name of the template that a particular row has.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          In addition to seeing the name, users must see from the application how the alignment would look according to the template they have selected. In other words, if the right-alignment template is selected, the products must be aligned to the right in the editor.
        </li>
        <li className="flex gap-4 max-w-5xl w-full items-center justify-between font-mono text-sm">
          Users can save the grid, but all rows must have products and all rows must have a template assigned.
        </li>
      </ul>
    </main>
  )
}
