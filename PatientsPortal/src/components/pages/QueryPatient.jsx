import React, { useState } from 'react';
import { Database, Clipboard, Copy, Download } from 'lucide-react';
import { useDatabaseContext } from '../../dbContext/DatabaseContext';
import { executeQuery } from '../../services/DatabaseService';

const QueryPatient = () => {
  const { isInitialized } = useDatabaseContext();
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM patients LIMIT 10');
  const [queryResult, setQueryResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleQueryChange = (e) => {
    setSqlQuery(e.target.value);
  };

  const executeCustomQuery = async () => {
    if (!sqlQuery.trim()) return;

    setIsExecuting(true);

    try {
      const result = await executeQuery(sqlQuery);
      setQueryResult(result);
    } catch (error) {
      setQueryResult({
        success: false,
        data: [],
        error: error.message || 'An error occurred while executing the query',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleLoadExample = (example) => {
    setSqlQuery(example);
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient Query</h1>
        <p className="mt-2 text-sm text-gray-600">Run custom SQL queries against the patient database</p>
      </header>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <label htmlFor="sqlQuery" className="form-label">SQL Query</label>
            <textarea
              id="sqlQuery"
              rows={5}
              className="form-input font-mono text-sm"
              value={sqlQuery}
              onChange={handleQueryChange}
              placeholder="Enter your SQL query here..."
            ></textarea>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLoadExample("SELECT * FROM patients WHERE last_name LIKE 'S%' ORDER BY last_name")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Clipboard className="h-4 w-4 mr-1" /> Filter by name
              </button>
              <button
                type="button"
                onClick={() => handleLoadExample("SELECT gender, COUNT(*) as count FROM patients GROUP BY gender")}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Clipboard className="h-4 w-4 mr-1" /> Statistics
              </button>
              <button
                type="button"
                onClick={() => handleLoadExample('DELETE FROM patients WHERE ID = 1')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Clipboard className="h-4 w-4 mr-1" /> Delete query
              </button>
            </div>
            <button
              type="button"
              onClick={executeCustomQuery}
              disabled={isExecuting}
              className="btn btn-primary"
            >
              {isExecuting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Executing...
                </>
              ) : (
                <>
                  <Database className="inline-flex items-center h-4 w-4 mr-1" /> Run Query
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {queryResult && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Query Results</h3>
            </div>

            {!queryResult.success ? (
              <div className="bg-error-50 border-l-4 border-error-600 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-error-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-error-700">
                      {queryResult.error || 'An error occurred while executing the query'}
                    </p>
                  </div>
                </div>
              </div>
            ) : queryResult.data.length === 0 ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No results</h3>
                <p className="mt-1 text-sm text-gray-500">Your query did not return any results.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(queryResult.data[0]).map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex}>
                            {value === null
                              ? <span className="text-gray-400">null</span>
                              : typeof value === 'object'
                                ? JSON.stringify(value)
                                : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {queryResult.success && queryResult.data.length > 0 && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <div className="text-sm text-gray-500">
                Showing {queryResult.data.length} {queryResult.data.length === 1 ? 'result' : 'results'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryPatient;
