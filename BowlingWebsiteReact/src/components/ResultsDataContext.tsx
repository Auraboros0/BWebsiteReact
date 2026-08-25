import type { tournamentEntry } from './HomeGallery';
import { useContext, createContext, useState } from 'react';

interface EntryType {
    entries: [string, [number, string]][];
    setEntries: (entries: [string, [number, string]][]) => void;
}

const ResultsDataContext = createContext<EntryType | undefined>(undefined)

export function ResultsProvider({ children }) {
  const [entries, setEntries] = useState<[string, [number, string]][]>([]);

    return (
        <ResultsDataContext.Provider value={{ entries, setEntries }}>
            {children}
        </ResultsDataContext.Provider>
    );
}

export function useEntries() {
    const context = useContext(ResultsDataContext);

    if (!context) {
      throw new Error();
    }

    return context;
}