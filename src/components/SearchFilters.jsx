function SearchFilters({ searchTerm, setSearchTerm, selectedRole, setSelectedRole, roles }) {
  return (
    <div className="filter-panel">
      <label className="search-field">
        <span className="sr-only">Search agents by name</span>
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search agents..."
        />
      </label>
      <div className="role-filters" aria-label="Filter agents by role">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            className={selectedRole === role ? 'active' : ''}
            aria-pressed={selectedRole === role}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilters
