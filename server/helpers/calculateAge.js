export function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthdate has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1; // Subtract 1 year if the birthdate hasn't occurred yet this year
  }
  return age;
}
