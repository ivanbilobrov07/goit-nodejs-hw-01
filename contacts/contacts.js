const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const writeToDB = (data) => {
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const getContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const ourContact = contacts.find((contact) => contact.id === contactId);

  return ourContact ?? null;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [contact] = contacts.splice(index, 1);

  writeToDB(contacts);

  return contact;
};

const addContact = async (data) => {
  const contacts = await getContacts();
  const newContact = { id: nanoid(), ...data };

  contacts.push(newContact);

  writeToDB(contacts);

  return newContact;
};

const editContact = async (data) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === data.id);

  if (index === -1) return null;

  const newContact = { ...contacts[index], ...data };

  contacts[index] = newContact;

  writeToDB(contacts);

  return newContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
