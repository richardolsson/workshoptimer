export default function parseTimeStr(str: string): Date | null {
  const fields = str.split(':');

  if (fields.length < 2 || fields.length > 3) {
    return null;
  }

  const numFields = fields.map((field) => parseInt(field));
  if (numFields.some((field) => isNaN(field))) {
    return null;
  }

  const [hours, minutes] = numFields;
  let seconds = 0;

  if (numFields.length == 3) {
    seconds = numFields[2];
  }

  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );
}
