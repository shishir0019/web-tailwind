// @ts-nocheck
import app, { create, findById } from '../helpers/api';

const API = '/api/fulfillment';
import Identity from '../models/identity';
import Team from '../models/team';
import Pickup from '../models/pickup';
import Order from '../models/order';
import axios from 'axios';
import { nanoid } from 'nanoid';

const TRIGGER_WEBHOOK =
  'https://flows.messagebird.com/flows/d74a3c84-0e11-4bd9-b90f-d61b1275e4e0/invoke';

app.post(`${API}/auth`, async (req, res, next) => {
  const external = req.body.conversationId;
  const identity = await Identity.findOne({ external });
  if (!identity) {
    return res.status(200).json({
      first_name: '',
      auth: ''
    });
  } else {
    return res.status(200).json({
      first_name: identity.first_name,
      auth: identity.auth.status,
      team: identity.teams[0].team
    });
  }
});

// Create a new identity
app.post(`${API}/identity`, async (req, res, next) => {
  console.log(req.body);
  const { first_name, phone, external } = req.body;
  const teams = {
    isMain: true,
    team: 'q-54ijUiKxDziBRizZxWe',
    createdAt: new Date().toISOString()
  };
  await Identity.create({
    first_name,
    phone,
    external,
    teams,
    email: `${nanoid()}@temp.email.mitbringen.io`,
    password: nanoid()
  });
  await axios.post(TRIGGER_WEBHOOK, {
    conversationId: '480b6201b9614599a4fe4c3209ee638c',
    text: `Neuer Benutzer ${first_name} hat sich registriert.`
  });
  return res.status(200).json({});
});

app.post(`${API}/order`, async (req, res, next) => {
  console.log(req.body);
  return res.status(200).json({});
});

app.post(`${API}/pickup`, async (req, res, next) => {
  const { pickup_location, team } = req.body;
  const time = req.body['time.time'];
  const date = req.body['time.normalized'];

  const identities = await Identity.find({ 'teams.team': team });

  for (let index = 0; index < identities.length; index++) {
    const identity = identities[index];
    const response = await axios.post(TRIGGER_WEBHOOK, {
      conversationId: identity.external,
      text: `Von ${pickup_location} um ${time}`
    });
    console.log(response.status);
  }
  return res.status(200).json({});
});

module.exports = app;
