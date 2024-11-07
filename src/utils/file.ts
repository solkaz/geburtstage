import Papa from 'papaparse';
import { FriendsList } from '../friend';

export function downloadFile(content: Blob, filename: string) {
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsCsv(entries: FriendsList) {
  downloadFile(
    new Blob(
      [
        Papa.unparse(
          entries.map(({ dateOfBirth, ...rest }) => ({
            ...rest,
            birthDay: dateOfBirth.day,
            birthMonth: dateOfBirth.month,
            birthYear: dateOfBirth.year,
          })),
        ),
      ],
      { type: 'text/csv' },
    ),
    `geburtstage-export-${new Date().toISOString()}.csv`,
  );
}

export function exportAsJson(entries: FriendsList) {
  downloadFile(
    new Blob([JSON.stringify(entries)], { type: 'text/json' }),
    `geburtstage-export-${new Date().toISOString()}.json`,
  );
}
