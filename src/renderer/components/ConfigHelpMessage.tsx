export type ConfigHelpMessageProps = {
  openConfiguration: () => void
}

export default ({ openConfiguration }: ConfigHelpMessageProps): JSX.Element => {
  return (
    <div className="ConfigHelpMessage alert">
      You seem to have nothing configured as of yet.
      <br />
      Click the&nbsp;
      <a href="#" onClick={openConfiguration}>
        "Configure"
      </a>
      &nbsp; button in the footer to get started or tinker with the JSON file
      directly.
    </div>
  )
}
