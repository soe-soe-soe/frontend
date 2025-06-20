/**
 * Utility-Funktionen für die Formatierung von Daten
 */

/**
 * Formatiert einen Geldbetrag in Euro mit deutscher Lokalisierung
 * @param value Betrag in Euro
 * @returns Formatierter String (z.B. "2.850.000 €")
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formatiert einen Geldbetrag in Millionen Euro
 * @param value Betrag in Euro
 * @returns Formatierter String (z.B. "2,85 Mio. €")
 */
export const formatCurrencyMillions = (value: number): string => {
  const millions = value / 1000000;
  return `${millions.toFixed(2)} Mio. €`;
};

/**
 * Formatiert einen Prozentwert mit einer Nachkommastelle
 * @param value Prozentwert
 * @returns Formatierter String (z.B. "8,5%")
 */
export const formatPercentage = (value: number | null): string => {
  if (value === null) return '-';
  return `${value.toFixed(1)}%`;
};

/**
 * Formatiert einen Prozentwert mit zwei Nachkommastellen
 * @param value Prozentwert
 * @returns Formatierter String (z.B. "8,52%")
 */
export const formatPercentagePrecise = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Formatiert ein Datum im deutschen Format
 * @param date Datum
 * @returns Formatierter String (z.B. "15.03.2023")
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('de-DE').format(date);
};

/**
 * Formatiert ein Datum im langen deutschen Format
 * @param date Datum
 * @returns Formatierter String (z.B. "15. März 2023")
 */
export const formatDateLong = (date: Date): string => {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Formatiert einen Energiewert in kWh ohne Nachkommastellen mit deutscher Lokalisierung
 * @param value Energiewert in kWh (kann Dezimalstellen haben)
 * @returns Formatierter String ohne Nachkommastellen (z.B. "1.234.567 kWh")
 */
export const formatEnergyKWh = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(value)) + ' kWh';
};

/**
 * Formatiert eine Dezimalzahl ohne Nachkommastellen mit deutscher Lokalisierung
 * @param value Numerischer Wert (kann Dezimalstellen haben)
 * @returns Formatierter String ohne Nachkommastellen (z.B. "1.234.567")
 */
export const formatNumberWithoutDecimals = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(value));
};

/**
 * Formatiert eine Anzahl mit Tausendertrennzeichen
 * @param value Numerischer Wert
 * @returns Formatierter String (z.B. "1.234")
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('de-DE').format(value);
};

/**
 * Bestimmt die Farbe für einen Projektstatus
 * @param status Projektstatus
 * @returns Material-UI Chip Color
 */
export const getStatusChipProps = (status: string) => {
  switch (status) {
    case 'Abgeschlossen': 
      return {
        color: 'success' as const,
        sx: {
          backgroundColor: '#e8f5e8', // Pastell-Grün wie im Screenshot
          color: '#2e7d32',
          '&.MuiChip-filled': {
            backgroundColor: '#e8f5e8',
          }
        }
      };
    case 'Laufend':
      return {
        color: 'primary' as const,
        sx: {
          backgroundColor: '#e3f2fd', // helles blau
          color: '#1976d2',
          '&.MuiChip-filled': {
            backgroundColor: '#e3f2fd',
          }
        }
      };
    case 'Entwurf':
      return {
        color: 'warning' as const,
        sx: {
          backgroundColor: '#fff3e0', // helles orange
          color: '#f57c00',
          '&.MuiChip-filled': {
            backgroundColor: '#fff3e0',
          }
        }
      };
    default:
      return {
        color: 'default' as const,
        sx: {}
      };
  }
};


/**
 * Bestimmt das Icon für einen Projektstatus
 * @param status Projektstatus
 * @returns Icon-Name für Material-UI
 */
export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'Laufend': 
      return 'play_circle';
    case 'Abgeschlossen': 
      return 'check_circle';
    case 'Entwurf': 
      return 'edit';
    default: 
      return 'help';
  }
};

/**
 * Truncates text to a maximum length and adds ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Berechnet die Gesamtzahl der Anlagen in einem Windpark
 * @param anlagen Array von Anlagen
 * @returns Gesamtanzahl
 */
export const calculateTotalAnlagen = (anlagen: Array<{ anzahl: number }>): number => {
  return anlagen.reduce((sum, anlage) => sum + anlage.anzahl, 0);
};

/**
 * Validiert eine E-Mail-Adresse (einfache Validierung)
 * @param email E-Mail-Adresse
 * @returns true wenn gültig
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validiert ob ein String nicht leer ist (nach Trimming)
 * @param value String-Wert
 * @returns true wenn nicht leer
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validiert ob ein numerischer Wert positiv ist
 * @param value Numerischer Wert
 * @returns true wenn positiv
 */
export const isPositive = (value: number): boolean => {
  return value > 0;
};

/**
 * Validiert ob ein Prozentwert im gültigen Bereich (0-100) liegt
 * @param value Prozentwert
 * @returns true wenn im gültigen Bereich
 */
export const isValidPercentage = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

/**
 * Konvertiert ein Datum sicher für HTML date input Felder
 * @param date Datum als Date-Objekt oder String
 * @returns Formatierter String im YYYY-MM-DD Format oder leerer String
 */
export const formatDateForInput = (date: Date | string | null): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split('T')[0];
    }
  } catch (error) {
    console.warn('Fehler beim Formatieren des Datums:', error);
  }
  
  return '';
};