const navigation = [
  ['index.html', 'Overview', 'O'], ['index.html#members', 'Members', 'M'],
  ['plans.html', 'Plans', 'P'], ['attendance.html', 'Attendance', 'A'],
  ['schedule.html', 'Schedule', 'S'], ['payments.html', 'Payments', '$'],
  ['reports.html', 'Reports', 'R'], ['settings.html', 'Settings', 'S'],
  ['about.html', 'About us', 'i']
];

const definitions = {
  plans: {
    title: 'Membership plans', eyebrow: 'Revenue & retention', action: 'Add plan',
    description: 'Build clear membership options and keep your plans easy to compare.',
    metrics: [['Plans available', '3', 'A mix for every training style'], ['Active members', '186', 'Across all membership types'], ['Monthly recurring', '$18,420', 'Current monthly run rate']],
    columns: ['Plan', 'Price', 'Billing', 'Members', 'Status'],
    fields: [['plan', 'Plan name'], ['price', 'Price'], ['billing', 'Billing cycle', 'select', ['Monthly', 'Annual', 'One-time']], ['members', 'Member count', 'number'], ['status', 'Status', 'select', ['Active', 'Paused']]],
    samples: [['Monthly', '$59', 'Monthly', '96', 'Active'], ['Annual', '$599', 'Annual', '58', 'Active'], ['Class pack', '$120', 'One-time', '32', 'Active']]
  },
  attendance: {
    title: 'Attendance', eyebrow: 'Studio activity', action: 'Record check-in',
    description: 'Track visits, check-in times, and the busiest parts of your day.',
    metrics: [['Today’s check-ins', '42', 'Member visits today'], ['Peak hour', '6:00 PM', 'Busiest time this week'], ['Visits this week', '318', 'Across all members']],
    columns: ['Member', 'Check-in', 'Activity', 'Status'],
    fields: [['member', 'Member name'], ['check-in', 'Check-in time', 'time'], ['activity', 'Activity'], ['status', 'Status', 'select', ['Checked in', 'Checked out']]],
    samples: [['Olivia Chen', '08:12', 'Strength floor', 'Checked in'], ['Noah Williams', '08:35', 'Open gym', 'Checked in'], ['Ava Patel', '09:02', 'Mobility class', 'Checked in'], ['Liam Johnson', '09:18', 'Open gym', 'Checked in']]
  },
  schedule: {
    title: 'Class schedule', eyebrow: 'Classes & coaching', action: 'Add class',
    description: 'Plan the week and keep classes running smoothly for members and coaches.',
    metrics: [['Classes today', '6', 'Across two studio spaces'], ['Next session', '12:30 PM', 'Lunch break mobility'], ['Bookings this week', '74', 'Member reservations']],
    columns: ['Time', 'Class', 'Coach', 'Studio', 'Booked'],
    fields: [['time', 'Start time', 'time'], ['class', 'Class name'], ['coach', 'Coach'], ['studio', 'Studio', 'select', ['Studio A', 'Studio B', 'Open Gym']], ['booked', 'Capacity (booked / total)']],
    samples: [['07:00', 'Strength foundations', 'Maya', 'Studio A', '8 / 12'], ['12:30', 'Lunch break mobility', 'Alex', 'Studio B', '6 / 10'], ['17:30', 'Flow & stretch', 'Maya', 'Studio B', '9 / 12'], ['18:30', 'Full body circuit', 'Jordan', 'Studio A', '11 / 14']]
  },
  payments: {
    title: 'Payments', eyebrow: 'Billing overview', action: 'Record payment',
    description: 'Review recent transactions, pending dues, and membership revenue.',
    metrics: [['Revenue this month', '$18,420', 'Up 6.4% from last month'], ['Pending payments', '8', 'Needs follow-up'], ['Renewals in 7 days', '$2,360', 'Expected recurring revenue']],
    columns: ['Member', 'Description', 'Amount', 'Date', 'Status'],
    fields: [['member', 'Member name'], ['description', 'Description'], ['amount', 'Amount', 'number'], ['date', 'Payment date', 'date'], ['status', 'Status', 'select', ['Paid', 'Pending', 'Overdue']]],
    samples: [['Olivia Chen', 'Annual membership', '$599', '2026-11-04', 'Paid'], ['Noah Williams', 'Monthly membership', '$59', '2026-11-03', 'Paid'], ['Ava Patel', 'Class pack', '$120', '2026-11-02', 'Paid'], ['Morgan Reed', 'Monthly membership', '$59', '2026-11-01', 'Pending']]
  },
  reports: {
    title: 'Reports & insights', eyebrow: 'Studio performance',
    description: 'A quick read on growth, retention, member visits, and monthly income.',
    metrics: [['Total members', '248', 'Up 12.8% vs last month'], ['Active memberships', '186', '75% of member base'], ['Revenue this month', '$18,420', 'Up 6.4% vs last month'], ['Renewal rate', '84%', 'Up 3.2% vs last month'], ['Average visits', '3.4 / week', 'Per active member'], ['Class fill rate', '78%', 'Across this month']],
    columns: ['Measure', 'Current', 'Change'], fields: [],
    samples: [['Member growth', '248 members', '+12.8%'], ['Renewal rate', '84%', '+3.2%'], ['Average visits', '3.4 / week', '+0.4'], ['Class fill rate', '78%', '+5.1%']]
  },
  settings: {
    title: 'Studio settings', eyebrow: 'Workspace preferences',
    description: 'Manage the contact details and preferences shown across your studio.',
    metrics: [], columns: [], fields: [], samples: []
  }
};

const page = document.body.dataset.page;
const definition = definitions[page];
const storageKey = `manoj-gym-${page}`;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const navMarkup = navigation.map(([href, label, icon]) => {
  const current = page === href.replace('.html', '') && !href.includes('#');
  return `<a class="${current ? 'active' : ''}" href="${href}" title="${label}"><span class="nav-icon">${icon}</span><span>${label}</span></a>`;
}).join('');
document.querySelector('.side').innerHTML = `<a class="brand" href="index.html"><span class="mark">✦</span><span>Manoj Gym Management System<small>fitness studio</small></span></a><p class="nav-label">Workspace</p><nav class="nav">${navMarkup}</nav><div class="side-bottom"><strong>Manoj Gym</strong><br>Membership workspace · Local data</div>`;
document.querySelector('.topbar').innerHTML = `<span>Studio / <strong>${escapeHtml(definition.title)}</strong></span><span>${new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())}</span>`;
document.querySelector('[data-title]').textContent = definition.title;
document.querySelector('[data-eyebrow]').textContent = definition.eyebrow;
document.querySelector('[data-description]').textContent = definition.description;
const content = document.querySelector('[data-content]');

if (page === 'settings') {
  const saved = JSON.parse(localStorage.getItem('manoj-gym-settings') || '{}');
  content.innerHTML = `<section class="panel"><div class="panel-head"><div><h2>Studio profile</h2><p class="panel-caption">These details are saved in this browser.</p></div></div><form id="settingsForm" class="settings-grid"><div class="setting"><label for="studio">Studio name</label><input id="studio" name="studio" value="${escapeHtml(saved.studio || 'Manoj Gym Management System')}" required></div><div class="setting"><label for="email">Contact email</label><input id="email" name="email" type="email" value="${escapeHtml(saved.email || 'hello@manojgym.fit')}" required></div><div class="setting"><label for="phone">Phone</label><input id="phone" name="phone" value="${escapeHtml(saved.phone || '+1 (555) 014-2026')}"></div><div class="setting"><label for="hours">Opening hours</label><input id="hours" name="hours" value="${escapeHtml(saved.hours || 'Mon-Fri 6 AM-9 PM, Sat-Sun 8 AM-6 PM')}"></div><div class="field full"><button class="button" type="submit">Save studio details</button></div></form></section><section class="panel"><h2>Data & privacy</h2><p class="subtitle">Records on this demo site are saved in browser storage on this device.</p><button class="button secondary" type="button" id="clearData">Clear management records</button></section>`;
  document.getElementById('settingsForm').addEventListener('submit', event => {
    event.preventDefault();
    localStorage.setItem('manoj-gym-settings', JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
    showToast('Studio settings saved.');
  });
  document.getElementById('clearData').addEventListener('click', () => {
    if (!confirm('Clear saved plans, attendance, schedule, and payment records on this device?')) return;
    ['plans', 'attendance', 'schedule', 'payments'].forEach(name => localStorage.removeItem(`manoj-gym-${name}`));
    showToast('Saved management records cleared.');
  });
} else {
  let records = JSON.parse(localStorage.getItem(storageKey) || 'null') || definition.samples.map((sample, index) => ({
    id: `sample-${index}`,
    ...Object.fromEntries(definition.columns.map((column, i) => [column.toLowerCase().replace(/\s+/g, ''), sample[i]]))
  }));
  const metrics = definition.metrics.map(([label, value, note]) => `<article class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div><div class="stat-note">${note}</div></article>`).join('');
  const exportButton = page === 'reports' ? '<button class="button secondary" id="export">Export CSV</button>' : '';
  const createButton = definition.fields.length ? `<button class="button" id="add">+ ${definition.action}</button>` : '';
  const chart = page === 'reports' ? `<section class="panel"><h2>Membership growth</h2><p class="panel-caption">Active member trend · May to November</p><div style="height:145px;display:flex;align-items:end;gap:10px;padding-top:18px">${[35, 48, 54, 67, 63, 79, 92].map((height, i) => `<div title="${['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}" style="flex:1;height:${height}%;border-radius:7px 7px 2px 2px;background:linear-gradient(180deg,#b7d590,#6f8d4f)"></div>`).join('')}</div><div style="display:flex;justify-content:space-between;color:#92988d;font-size:9px;margin-top:9px"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div></section>` : '';
  content.innerHTML = `${metrics ? `<section class="stats">${metrics}</section>` : ''}<section class="panel"><div class="panel-head"><div><h2>${definition.title} records</h2><p class="panel-caption">Saved in this browser · ${records.length} records</p></div><div class="table-tools"><input class="search" id="search" type="search" placeholder="Search records..." aria-label="Search records">${createButton}${exportButton}</div></div><div class="table-scroll"><table><thead><tr>${definition.columns.map(column => `<th>${escapeHtml(column.toUpperCase())}</th>`).join('')}<th>ACTIONS</th></tr></thead><tbody id="rows"></tbody></table></div><div class="empty" id="empty" hidden>No matching records found.</div></section>${chart}`;
  const tableBody = document.getElementById('rows');
  function renderRows() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const visible = records.filter(record => Object.values(record).join(' ').toLowerCase().includes(query));
    tableBody.innerHTML = visible.map(record => `<tr>${definition.columns.map(column => {
      const value = record[column.toLowerCase().replace(/\s+/g, '')] ?? '';
      return `<td>${/status/i.test(column) ? `<span class="pill ${/pending|overdue|paused|out/i.test(value) ? 'warn' : ''}">${escapeHtml(value)}</span>` : escapeHtml(value)}</td>`;
    }).join('')}<td><button class="row-action" data-delete="${escapeHtml(record.id)}" aria-label="Delete record">Delete</button></td></tr>`).join('');
    document.getElementById('empty').hidden = visible.length > 0;
  }
  renderRows();
  document.getElementById('search').addEventListener('input', renderRows);
  tableBody.addEventListener('click', event => {
    const id = event.target.dataset.delete;
    if (!id) return;
    records = records.filter(record => String(record.id) !== id);
    localStorage.setItem(storageKey, JSON.stringify(records));
    renderRows();
    showToast('Record removed.');
  });
  if (definition.fields.length) document.getElementById('add').addEventListener('click', () => openRecordForm(definition));
  if (page === 'reports') document.getElementById('export').addEventListener('click', () => {
    const csv = [definition.columns, ...records.map(record => definition.columns.map(column => record[column.toLowerCase().replace(/\s+/g, '')] || ''))]
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const file = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = file; link.download = 'manoj-gym-report.csv'; link.click(); URL.revokeObjectURL(file);
    showToast('Report exported.');
  });
  document.getElementById('recordForm').addEventListener('submit', event => {
    event.preventDefault();
    const record = Object.fromEntries(new FormData(event.currentTarget));
    record.id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    records.unshift(record);
    localStorage.setItem(storageKey, JSON.stringify(records));
    event.currentTarget.reset();
    document.getElementById('recordDialog').close();
    renderRows();
    showToast('Record saved.');
  });
}

function openRecordForm(config) {
  document.getElementById('dialogTitle').textContent = config.action;
  document.getElementById('fields').innerHTML = config.fields.map(([name, label, type = 'text', options]) => {
    const control = type === 'select'
      ? `<select id="field-${name}" name="${name}" required>${options.map(option => `<option>${escapeHtml(option)}</option>`).join('')}</select>`
      : `<input id="field-${name}" name="${name}" type="${type}" required>`;
    return `<div class="field"><label for="field-${name}">${escapeHtml(label)}</label>${control}</div>`;
  }).join('');
  document.getElementById('recordDialog').showModal();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
