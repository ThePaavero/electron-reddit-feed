export type ConfigHelpMessageProps = {
  openConfiguration: () => void
}

export default ({ openConfiguration }: ConfigHelpMessageProps): JSX.Element => {
  return (
    <div className="ConfigHelpMessage alert">
      You seem to have nothing configured as of yet.
      <br />
      Click the{' '}
      <a href="#" onClick={openConfiguration}>
        "Configure"
      </a>{' '}
      button in the footer to get started or tinker with the JSON file directly.
    </div>
  )
}
