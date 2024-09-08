class UtilsDate {
  public diferenceMonth(initialDate: Date, finalDate: Date): number {
    const years = finalDate.getFullYear() - initialDate.getFullYear();
    const months = finalDate.getMonth() - initialDate.getMonth();
    return years * 12 + months;
  }
}

export default UtilsDate;
