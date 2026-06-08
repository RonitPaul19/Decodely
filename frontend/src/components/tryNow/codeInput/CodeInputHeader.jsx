export default function CodeInputHeader({
  selectedLanguage,
  detectedLanguage,
  languageOptions,
  languageLabels,
  onLanguageChange,
}) {
  const showDetected = selectedLanguage === "auto" && detectedLanguage && detectedLanguage !== "auto"

  return (
    <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold">Paste Your Code</h2>
        <p className="text-zinc-400 text-xs mt-2">
          {selectedLanguage === "auto"
            ? showDetected
              ? `Auto detect enabled · detected language: ${languageLabels[detectedLanguage] || "unknown"}`
              : "Auto detect enabled · language will be inferred from your code."
            : `Selected language: ${languageLabels[selectedLanguage] || "unknown"}`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-zinc-400 text-sm" htmlFor="language-select">
          Language
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(event) => onLanguageChange(event.target.value)}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-white focus:ring-2 focus:ring-white/10"
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-zinc-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
