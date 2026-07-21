lucide.createIcons();

const registerAppShell = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch((error) => console.warn('Service worker registration failed:', error));
        });
    }

    const splash = document.createElement('div');
    splash.id = 'app-splash';
    splash.innerHTML = `
        <div class="card">
            <img src="assets/app-splash.svg" alt="CMB logo" />
            <h1 class="text-2xl font-bold tracking-tight">CMB Tools</h1>
            <p class="mt-2 text-sm text-blue-50">Loading your GSTR-1 workspace…</p>
        </div>
    `;
    document.body.appendChild(splash);
    window.setTimeout(() => splash.classList.add('hide'), 900);
    window.setTimeout(() => splash.remove(), 1250);
};

registerAppShell();

// UI: Smooth Sidebar Toggle Logic
function toggleSidebar() {
    const sidebar = document.getElementById('desktop-sidebar');
    const mainContent = document.getElementById('main-content');
    const topNav = document.getElementById('top-nav');
    
    const isExpanded = sidebar.classList.contains('sidebar-expanded');
    
    if (isExpanded) {
        sidebar.classList.remove('sidebar-expanded', 'w-64');
        sidebar.classList.add('sidebar-collapsed', 'w-20');
        mainContent.classList.remove('pl-64');
        mainContent.classList.add('pl-20');
        topNav.classList.remove('pl-64');
        topNav.classList.add('pl-20');
    } else {
        sidebar.classList.remove('sidebar-collapsed', 'w-20');
        sidebar.classList.add('sidebar-expanded', 'w-64');
        mainContent.classList.remove('pl-20');
        mainContent.classList.add('pl-64');
        topNav.classList.remove('pl-20');
        topNav.classList.add('pl-64');
    }
    document.querySelectorAll('.submenu').forEach((submenu) => submenu.classList.add('hidden'));
}

function toggleSubmenu(id) {
    const sidebar = document.getElementById('desktop-sidebar');
    if (!sidebar.classList.contains('sidebar-expanded')) return;

    const submenu = document.getElementById(`submenu-${id}`);
    if (!submenu) return;

    document.querySelectorAll('.submenu').forEach((item) => {
        if (item.id !== submenu.id) item.classList.add('hidden');
    });

    submenu.classList.toggle('hidden');
}

const moduleContent = {
    clients: {
        title: 'Client Form',
        subtitle: 'Create or update client records from the main workspace.',
        body: `
            <div class="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
                <section class="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                    <h4 class="text-lg font-bold text-slate-900">Add Client</h4>
                    <p class="mt-1 text-sm text-slate-500">Use the side form to keep company details organized.</p>
                    <div class="mt-4 space-y-3">
                        <input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Company Name" />
                        <input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Contact Person" />
                        <input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="GSTIN" />
                        <textarea rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Notes"></textarea>
                        <button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Client</button>
                    </div>
                </section>
                <section class="bg-white rounded-2xl border border-slate-200 p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="text-lg font-bold text-slate-900">Client List</h4>
                            <p class="text-sm text-slate-500">Search, filter, and review your active accounts.</p>
                        </div>
                        <button type="button" class="text-sm font-semibold text-brand-600">+ New</button>
                    </div>
                    <div class="mt-4 overflow-x-auto">
                        <table class="min-w-full text-sm text-left">
                            <thead class="bg-slate-50 text-slate-600">
                                <tr>
                                    <th class="px-3 py-2">Company</th>
                                    <th class="px-3 py-2">GSTIN</th>
                                    <th class="px-3 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr><td class="px-3 py-2">CMB Tech</td><td class="px-3 py-2">32AAAAA0000A1Z5</td><td class="px-3 py-2"><span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Active</span></td></tr>
                                <tr><td class="px-3 py-2">North Star Pvt Ltd</td><td class="px-3 py-2">32AAAAA0000A2Z4</td><td class="px-3 py-2"><span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Pending</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        `
    },
    branches: {
        title: 'Branch Form',
        subtitle: 'Manage branch offices and branch-wise details.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Branch Setup</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Branch Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Manager" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Address" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Branch</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Branch Summary</h4><p class="mt-2 text-sm text-slate-500">Keep branch operations and staffing aligned.</p><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Kochi Office • 6 active staff</div><div class="rounded-xl border border-slate-200 p-3">Trivandrum Hub • 4 active staff</div></div></section></div>`
    },
    bank: {
        title: 'Bank Form',
        subtitle: 'Store banking details, account references, and payment notes.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Bank Account</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Bank Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Account Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="IFSC" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Bank Details</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Recent Records</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">HDFC • 10123456789</div><div class="rounded-xl border border-slate-200 p-3">SBI • 22100001111</div></div></section></div>`
    },
    task: {
        title: 'Task Form',
        subtitle: 'Plan tasks, due dates, and task owners in one place.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Create Task</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Task Title" /><textarea rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Task Details"></textarea><input type="date" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Task</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Task Calendar</h4><div class="mt-4 grid grid-cols-2 gap-3"><div class="rounded-xl border border-slate-200 p-3">Follow-up review • 08 Jul</div><div class="rounded-xl border border-slate-200 p-3">Invoice send • 10 Jul</div><div class="rounded-xl border border-slate-200 p-3">Attendance audit • 12 Jul</div><div class="rounded-xl border border-slate-200 p-3">Client meeting • 15 Jul</div></div></section></div>`
    },
    projects: {
        title: 'Projects Form',
        subtitle: 'Track project milestones and owners.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Project Details</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Project Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Lead" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Deadline" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Project</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Open Projects</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">GST Portal Migration • 80%</div><div class="rounded-xl border border-slate-200 p-3">Client CRM Setup • 54%</div></div></section></div>`
    },
    attendance: {
        title: 'Attendance Form',
        subtitle: 'Capture attendance and view a quick monthly summary.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Mark Attendance</h4><div class="mt-4 space-y-3"><select class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"><option>Present</option><option>Half Day</option><option>Absent</option></select><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Employee Name" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Attendance</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Attendance Overview</h4><div class="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Present: 46 • Late: 3 • Absent: 2</div></section></div>`
    },
    'employees-data': {
        title: 'Employees Form',
        subtitle: 'Maintain employee details, departments, and contact information.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Employee Record</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Employee Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Department" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Mobile" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Employee</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Employee Directory</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Asha Menon • Accounts</div><div class="rounded-xl border border-slate-200 p-3">Ravi Thomas • Operations</div></div></section></div>`
    },
    'salary-chart': {
        title: 'Salary Chart Form',
        subtitle: 'Review salary structures and payable components.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Salary Setup</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Employee Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Basic Salary" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Allowance" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Salary Chart</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Salary Summary</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Asha Menon • ₹ 48,000</div><div class="rounded-xl border border-slate-200 p-3">Ravi Thomas • ₹ 56,000</div></div></section></div>`
    },
    'pay-slip': {
        title: 'Pay Slip Form',
        subtitle: 'Prepare pay slips and record payment dates.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Generate Pay Slip</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Employee Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Net Pay" /><input type="date" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Generate Slip</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Payslips Ready</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">June 2026 • Asha Menon</div><div class="rounded-xl border border-slate-200 p-3">June 2026 • Ravi Thomas</div></div></section></div>`
    },
    ledgers: {
        title: 'Ledger Form',
        subtitle: 'Create ledger entries for business transactions.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Ledger Entry</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Ledger Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Opening Balance" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Ledger</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Ledger Summary</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Sales Ledger • ₹ 1,28,000</div><div class="rounded-xl border border-slate-200 p-3">Purchase Ledger • ₹ 84,500</div></div></section></div>`
    },
    vouchers: {
        title: 'Voucher Form',
        subtitle: 'Upload or create vouchers for daily accounting entries.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Voucher Entry</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Voucher Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Amount" /><textarea rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Narration"></textarea><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Voucher</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Voucher Queue</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">JV-101 • Pending approval</div><div class="rounded-xl border border-slate-200 p-3">PV-205 • Ready to post</div></div></section></div>`
    },
    inventory: {
        title: 'Inventory Form',
        subtitle: 'Keep stock movement and inventory records organized.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Inventory Item</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Item Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Quantity" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Rate" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Inventory</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Stock Status</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Laptop • 16 units</div><div class="rounded-xl border border-slate-200 p-3">Printer • 8 units</div></div></section></div>`
    },
    transactions: {
        title: 'Transaction Form',
        subtitle: 'Log financial transactions and their payment status.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Transaction Entry</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Reference" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Amount" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Mode" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Transaction</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Recent Transactions</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">Payment Received • ₹ 20,000</div><div class="rounded-xl border border-slate-200 p-3">Bank Transfer • ₹ 10,500</div></div></section></div>`
    },
    'cheque-record': {
        title: 'Cheque Record Form',
        subtitle: 'Record cheque details and clearance status.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Cheque Entry</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Cheque Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Amount" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Bank" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Cheque</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Cheque Status</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">CHQ-112 • Cleared</div><div class="rounded-xl border border-slate-200 p-3">CHQ-113 • Pending</div></div></section></div>`
    },
    credentials: {
        title: 'Credentials Form',
        subtitle: 'Store portal credentials and secure login references.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Portal Credentials</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Portal Name" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Username" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Password" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Credentials</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Saved Logins</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">GST Portal • Active</div><div class="rounded-xl border border-slate-200 p-3">Income Tax Portal • Active</div></div></section></div>`
    },
    logo: {
        title: 'Logo Form',
        subtitle: 'Upload and preview branded logo assets.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Logo Asset</h4><div class="mt-4 space-y-3"><input type="file" class="w-full text-sm" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Upload Logo</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Preview</h4><div class="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">No logo selected</div></section></div>`
    },
    'letter-head': {
        title: 'Letter Head Form',
        subtitle: 'Prepare letterhead templates for official use.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Letter Head Template</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Title" /><textarea rows="4" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Content"></textarea><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Header</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Template Preview</h4><div class="mt-4 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">Official letter heading preview will appear here.</div></section></div>`
    },
    'address-seal': {
        title: 'Address Seal Form',
        subtitle: 'Manage official stamp and address seal content.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Seal Content</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Company Name" /><textarea rows="4" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Address"></textarea><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Seal</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Seal Preview</h4><div class="mt-4 rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">Official address seal preview will appear here.</div></section></div>`
    },
    invoice: {
        title: 'Invoice Form',
        subtitle: 'Create invoice templates and details for clients.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Invoice Template</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Invoice Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Client" /><textarea rows="4" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Items"></textarea><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Invoice</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Invoice Queue</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">INV-1001 • Pending</div><div class="rounded-xl border border-slate-200 p-3">INV-1002 • Sent</div></div></section></div>`
    },
    'receipt-voucher': {
        title: 'Receipt Voucher Form',
        subtitle: 'Record receipts and payment acknowledgements.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Receipt Voucher</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Receipt Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Amount" /><input type="date" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Receipt</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Receipt History</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">RCPT-001 • ₹ 15,000</div><div class="rounded-xl border border-slate-200 p-3">RCPT-002 • ₹ 7,500</div></div></section></div>`
    },
    'payment-voucher': {
        title: 'Payment Voucher Form',
        subtitle: 'Log payments and payment approvals.',
        body: `<div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6"><section class="bg-slate-50 rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Payment Voucher</h4><div class="mt-4 space-y-3"><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Voucher Number" /><input class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Amount" /><textarea rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Narration"></textarea><button type="button" class="w-full bg-brand-600 text-white py-2.5 rounded-lg text-sm font-semibold">Save Payment</button></div></section><section class="bg-white rounded-2xl border border-slate-200 p-5"><h4 class="text-lg font-bold text-slate-900">Payment Queue</h4><div class="mt-4 space-y-2"><div class="rounded-xl border border-slate-200 p-3">PMT-100 • Approved</div><div class="rounded-xl border border-slate-200 p-3">PMT-101 • Pending</div></div></section></div>`
    }
};

function showView(view) {
    const dashboardView = document.getElementById('dashboardView');
    const moduleView = document.getElementById('moduleView');
    const converterView = document.getElementById('converterView');

    dashboardView.classList.add('hidden');
    moduleView.classList.add('hidden');
    converterView.classList.add('hidden');

    if (view === 'dashboard') {
        dashboardView.classList.remove('hidden');
    } else if (view === 'converter') {
        converterView.classList.remove('hidden');
    }
}

function showModule(module) {
    const moduleView = document.getElementById('moduleView');
    const dashboardView = document.getElementById('dashboardView');
    const converterView = document.getElementById('converterView');
    const panel = document.getElementById('modulePanel');

    dashboardView.classList.add('hidden');
    converterView.classList.add('hidden');
    moduleView.classList.remove('hidden');

    const content = moduleContent[module] || moduleContent.clients;
    panel.innerHTML = `
        <div class="flex items-center justify-between mb-5">
            <div>
                <p class="text-sm font-semibold text-slate-500">Module View</p>
                <h3 class="text-2xl font-bold text-slate-900">${content.title}</h3>
                <p class="mt-1 text-sm text-slate-500">${content.subtitle}</p>
            </div>
            <button type="button" onclick="showView('dashboard')" class="text-sm font-semibold text-brand-600">Back to Dashboard</button>
        </div>
        ${content.body}
    `;
}

// --- GSTR-1 OFFICIAL JSON MAPPING & CALCULATION LOGIC ---

const getBlankGstJson = () => ({
    gstin: "", fp: "", version: "GST3.2.4", hash: "hash",
    b2b: [], b2cs: [], nil: { inv: [] }, exp: [], cdnr: [],
    doc_issue: { doc_det: [] }, hsn: { hsn_b2b: [] }
});

let finalGstJson = getBlankGstJson();

const blankStats = () => ({
    b2b: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
    b2cs: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
    cdnr: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
    exp: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
    hsn: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
    docs: { count: 0, txval: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 }
});

let stats = blankStats();

// Helper: Precision Math
const num2 = (val) => {
    if (val === null || val === undefined || val === '') return 0;
    const cleaned = String(val).replace(/[₹$,]/g, '').trim();
    const match = cleaned.match(/-?\d+(?:\.\d+)?/);
    const numeric = match ? parseFloat(match[0]) : parseFloat(cleaned);
    return Number((Number.isFinite(numeric) ? numeric : 0).toFixed(2));
};

const normalizeKey = (k) => String(k ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '');

const aliasMap = {
    invoicenumber: ['invoiceno','invoicenum','invoice no','invoice no.','billno','billnumber','invnum','invno','invoiceno.'],
    invoicedate: ['invoicedate','invoicedt','invoice date','billdate','docdate','dated'],
    taxablevalue: ['taxablevalue','taxableamount','taxableamt','taxable','taxamount','taxableval','taxable value'],
    invoicevalue: ['invoicevalue','invoiceamount','invoiceamt','amount','totalvalue','totalamount','netvalue','netamount','invoice val'],
    placeofsupply: ['placeofsupply','placeofsupply','pos','state','supplystate','place of supply'],
    rate: ['rate','taxrate','ratepercent','gstpercent','percentage','rt','rate %'],
    cess: ['cess','cessamount','cessamt'],
    integratedtax: ['integratedtax','igst','integratedtaxamount','igstamount'],
    centraltax: ['centraltax','cgst','centraltaxamount','cgstamount'],
    stateuttax: ['stateuttax','sgst','stateuttaxamount','sgstamount'],
    recipient: ['recipient','gstin','gstinrecipient','consigneegstin','customergstin','gstinuinofrecipient'],
    notenumber: ['notenumber','noteno','note num','notenum','dcino','debitcreditnote'],
    notedate: ['notedate','notedt','dcidate'],
    notevalue: ['notevalue','noteamount','amount','totalvalue','totvalue'],
    natureofdocument: ['natureofdocument','documenttype','doctype','nature of document','doc type'],
    exporttype: ['exporttype','exptype','export type','export']
};

// Helper: Extract Data From Excel Row safely
const getKey = (row, ...possibleKeys) => {
    const normalizedRow = Object.entries(row).reduce((acc, [k, v]) => {
        acc[normalizeKey(k)] = v;
        return acc;
    }, {});

    const candidateKeys = [...new Set(possibleKeys.flatMap(pk => {
        const target = normalizeKey(pk);
        return [target, ...(aliasMap[target] || [])];
    }))];

    for (let candidate of candidateKeys) {
        if (normalizedRow[candidate] !== undefined) return normalizedRow[candidate];
        const matchKey = Object.keys(normalizedRow).find(k => k.includes(candidate) || candidate.includes(k));
        if (matchKey) return normalizedRow[matchKey];
    }
    return undefined;
};

function findHeaderRowIndex(rows) {
    const keywords = ['invoice','gstin','recipient','taxable','rate','place','cess','amount','hsn','document','note','from','to','total','date'];
    for (let i = 0; i < Math.min(rows.length, 10); i++) {
        const joined = (rows[i] || []).filter(Boolean).join(' ').toLowerCase();
        const score = keywords.reduce((sum, keyword) => sum + (joined.includes(keyword) ? 1 : 0), 0);
        if (score >= 2) return i;
    }
    return 3;
}

function detectSectionFromHeaderRow(row) {
    const joined = (row || []).filter(Boolean).join(' ').toLowerCase();
    if (!joined) return null;
    if ((joined.includes('invoice number') || joined.includes('invoice value') || joined.includes('gstin') && joined.includes('recipient')) && !joined.includes('note')) return 'b2b';
    if (joined.includes('note number') || joined.includes('note date')) return 'cdnr';
    if (joined.includes('export type') || joined.includes('shipping bill')) return 'exp';
    if (joined.includes('nature of document') || joined.includes('sr. no. from')) return 'docs';
    if (joined.includes('hsn') && joined.includes('description')) return 'hsn_b2b';
    if (joined.includes('nil rated') || joined.includes('exempted') || joined.includes('non-gst')) return 'nil';
    if ((joined.includes('place of supply') || joined.includes('type')) && joined.includes('taxable value') && !joined.includes('invoice')) return 'b2cs';
    if ((joined.includes('net value of supplies') || joined.includes('e-commerce')) && joined.includes('integrated tax')) return 'b2cs';
    return null;
}

function extractSheetRows(worksheet) {
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    if (!rows || rows.length === 0) return [];

    const headerRowIndex = findHeaderRowIndex(rows);
    const headerRow = rows[headerRowIndex] || [];

    return rows.slice(headerRowIndex + 1).map((row) => {
        const obj = {};
        headerRow.forEach((header, index) => {
            const key = header !== undefined && header !== null && String(header).trim()
                ? String(header).trim()
                : `col${index + 1}`;
            obj[key] = row[index];
        });
        return obj;
    }).filter((row) => Object.values(row).some((value) => value !== '' && value !== undefined && value !== null));
}

function extractSectionBlocks(worksheet) {
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    if (!rows || rows.length === 0) return [];

    const blocks = [];
    let currentSection = null;
    let currentHeader = null;
    let dataStartIndex = null;

    rows.forEach((row, index) => {
        const headerSection = detectSectionFromHeaderRow(row);
        if (headerSection) {
            if (currentSection && currentHeader && dataStartIndex !== null) {
                const blockRows = rows.slice(dataStartIndex, index).map((dataRow) => {
                    const obj = {};
                    currentHeader.forEach((header, headerIndex) => {
                        const key = header !== undefined && header !== null && String(header).trim()
                            ? String(header).trim()
                            : `col${headerIndex + 1}`;
                        obj[key] = dataRow[headerIndex];
                    });
                    return obj;
                }).filter((dataRow) => Object.values(dataRow).some((value) => value !== '' && value !== undefined && value !== null));

                if (blockRows.length > 0) blocks.push({ section: currentSection, data: blockRows });
            }

            currentSection = headerSection;
            currentHeader = row;
            dataStartIndex = index + 1;
            return;
        }
    });

    if (currentSection && currentHeader && dataStartIndex !== null) {
        const blockRows = rows.slice(dataStartIndex).map((dataRow) => {
            const obj = {};
            currentHeader.forEach((header, headerIndex) => {
                const key = header !== undefined && header !== null && String(header).trim()
                    ? String(header).trim()
                    : `col${headerIndex + 1}`;
                obj[key] = dataRow[headerIndex];
            });
            return obj;
        }).filter((dataRow) => Object.values(dataRow).some((value) => value !== '' && value !== undefined && value !== null));

        if (blockRows.length > 0) blocks.push({ section: currentSection, data: blockRows });
    }

    return blocks;
}

// AUTO-CALCULATION ENGINE (Strictly based on POS vs State Code)
function calculateTaxes(txval, rt, pos, manualIamt, manualCamt, manualSamt) {
    let myState = (document.getElementById('gstinInput').value || "32").trim().substring(0,2);
    let targetPos = (pos || "").toString().split('-')[0].trim();
    if(!targetPos) targetPos = myState; 

    let isInterState = (targetPos !== myState);
    let calcTotalTax = num2(txval * (rt / 100));
    let taxes = {};

    if (isInterState) {
        let iamt = manualIamt ? num2(manualIamt) : calcTotalTax;
        if(iamt > 0) taxes.iamt = iamt;
    } else {
        let halfTax = num2(calcTotalTax / 2);
        let camt = manualCamt ? num2(manualCamt) : halfTax;
        let samt = manualSamt ? num2(manualSamt) : halfTax;
        if(camt > 0) taxes.camt = camt;
        if(samt > 0) taxes.samt = samt;
    }
    return taxes;
}

// Trigger File Upload Processing
document.getElementById('fileUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        
        const sheetMap = {
            'b2b': 'b2b', 'b2cs': 'b2cs', 'cdnr': 'cdnr', 'exp': 'exp', 'nil': 'nil',
            'hsn': 'hsn_b2b', 'docs': 'docs'
        };

        // Clear previous state
        finalGstJson = getBlankGstJson();
        stats = blankStats();
        let processedAny = false;

        workbook.SheetNames.forEach(sheetName => {
            const normName = sheetName.toLowerCase().trim();
            const worksheet = workbook.Sheets[sheetName];
            const blocks = extractSectionBlocks(worksheet);

            if (blocks.length > 0) {
                blocks.forEach(({ section, data }) => {
                    routeDataToParser(section, data);
                    processedAny = true;
                });
            } else if (sheetMap[normName]) {
                const jsonData = extractSheetRows(worksheet);
                if (jsonData.length > 0) {
                    routeDataToParser(sheetMap[normName], jsonData);
                    processedAny = true;
                }
            }
        });

        if(processedAny) {
            updateUIStats();
        } else {
            alert("No valid data found. Ensure sheets are named B2B, B2CS, etc., and data starts from Row 4.");
        }
        document.getElementById('fileUpload').value = ""; 
    };
    reader.readAsArrayBuffer(file);
});

function routeDataToParser(section, data) {
    if (section === 'b2b') processB2B(data);
    else if (section === 'b2cs') processB2CS(data);
    else if (section === 'cdnr') processCDNR(data);
    else if (section === 'exp') processEXP(data);
    else if (section === 'nil') processNIL(data);
    else if (section === 'hsn_b2b') processHSN(data);
    else if (section === 'docs') processDOCS(data);
}

// --- SECTION SPECIFIC OFFICIAL PARSERS ---

function processB2B(data) {
    let map = {};
    data.forEach(row => {
        let gstin = getKey(row, "gstin", "recipient");
        let inum = getKey(row, "invoice number");
        let idt = getKey(row, "invoice date");
        let pos = (getKey(row, "place of supply") || "").toString().split('-')[0].trim();
        let rt = num2(getKey(row, "rate"));
        let txval = num2(getKey(row, "taxable value", "taxable amount", "taxable amt"));
        let csamt = num2(getKey(row, "cess"));
        let val = num2(getKey(row, "invoice value", "invoice amount", "amount", "total value"));

        if (txval <= 0 && val > 0) txval = val;
        if (!gstin || !inum || (txval <= 0 && val <= 0)) return;

        // Enforce auto CGST/SGST/IGST mapping
        let taxes = calculateTaxes(txval, rt, pos, getKey(row, "integrated tax", "igst"), getKey(row, "central tax", "cgst"), getKey(row, "state/ut tax", "sgst"));
        
        // Fallback Invoice Value if missing
        if (!val) val = num2(txval + (taxes.iamt || 0) + (taxes.camt || 0) + (taxes.samt || 0) + csamt);

        if (!map[gstin]) map[gstin] = {};
        if (!map[gstin][inum]) {
            map[gstin][inum] = { 
                inum, idt, val, pos, 
                rchrg: getKey(row, "reverse") || "N", 
                inv_typ: getKey(row, "invoice type") || "R", 
                itms: [] 
            };
            stats.b2b.count++;
        }

        let itm_det = { txval, rt, ...taxes, csamt };
        let itemNum = map[gstin][inum].itms.length + 1;
        map[gstin][inum].itms.push({ num: itemNum, itm_det });

        stats.b2b.txval += txval; 
        stats.b2b.igst += (taxes.iamt || 0); stats.b2b.cgst += (taxes.camt || 0); 
        stats.b2b.sgst += (taxes.samt || 0); stats.b2b.cess += csamt;
    });

    for (const [ctin, invs] of Object.entries(map)) {
        finalGstJson.b2b.push({ ctin, inv: Object.values(invs) });
    }
}

function processB2CS(data) {
    let myState = (document.getElementById('gstinInput').value || "32").trim().substring(0,2);
    data.forEach(row => {
        let pos = (getKey(row, "place of supply") || "").toString().split('-')[0].trim();
        let txval = num2(getKey(row, "taxable value", "taxable amount", "taxable amt"));
        let rt = num2(getKey(row, "rate"));
        let csamt = num2(getKey(row, "cess"));
        let invoiceNo = getKey(row, "invoice number", "invoice no", "bill no", "invoiceno");
        let invoiceValue = num2(getKey(row, "invoice value", "invoice amount", "amount", "total value"));
        let sply_ty = getKey(row, "type", "supply type") || (pos === myState ? "INTRA" : "INTER");

        const hasB2CSignals = invoiceNo || invoiceValue > 0 || txval > 0;
        if (!hasB2CSignals) return;
        if (invoiceNo && invoiceValue > 0 && txval > 0) return;

        if (txval > 0) {
            let taxes = calculateTaxes(txval, rt, pos, getKey(row, "integrated tax", "igst"), getKey(row, "central tax", "cgst"), getKey(row, "state/ut tax", "sgst"));
            finalGstJson.b2cs.push({ sply_ty, rt, typ: "OE", pos, txval, ...taxes, csamt });

            stats.b2cs.count++;
            stats.b2cs.txval += txval; stats.b2cs.igst += (taxes.iamt || 0);
            stats.b2cs.cgst += (taxes.camt || 0); stats.b2cs.sgst += (taxes.samt || 0); 
            stats.b2cs.cess += csamt;
        }
    });
}

function processCDNR(data) {
    let map = {};
    data.forEach(row => {
        let gstin = getKey(row, "gstin", "recipient");
        let nt_num = getKey(row, "note number");
        let nt_dt = getKey(row, "note date");
        let pos = (getKey(row, "place of supply") || "").toString().split('-')[0].trim();
        let rt = num2(getKey(row, "rate"));
        let txval = num2(getKey(row, "taxable value"));
        let csamt = num2(getKey(row, "cess"));
        let val = num2(getKey(row, "note value"));

        if (!gstin || !nt_num || txval <= 0) return;

        let taxes = calculateTaxes(txval, rt, pos, getKey(row, "integrated tax", "igst"), getKey(row, "central tax", "cgst"), getKey(row, "state/ut tax", "sgst"));
        if (!val) val = num2(txval + (taxes.iamt || 0) + (taxes.camt || 0) + (taxes.samt || 0) + csamt);

        if (!map[gstin]) map[gstin] = {};
        if (!map[gstin][nt_num]) {
            map[gstin][nt_num] = { 
                nt_num, nt_dt, val, pos, 
                ntty: getKey(row, "note type") || "C", 
                rchrg: "N", inv_typ: "R", itms: [] 
            };
            stats.cdnr.count++;
        }
        
        let itemNum = map[gstin][nt_num].itms.length + 1;
        map[gstin][nt_num].itms.push({ num: itemNum, itm_det: { txval, rt, ...taxes, csamt }});

        stats.cdnr.txval += txval; stats.cdnr.igst += (taxes.iamt || 0);
        stats.cdnr.cgst += (taxes.camt || 0); stats.cdnr.sgst += (taxes.samt || 0); 
        stats.cdnr.cess += csamt;
    });

    for (const [ctin, nts] of Object.entries(map)) {
        finalGstJson.cdnr.push({ ctin, nt: Object.values(nts) });
    }
}

function processEXP(data) {
    let map = {};
    data.forEach(row => {
        let typ = getKey(row, "export type", "exp type") || "WOPAY";
        let inum = getKey(row, "invoice number");
        let idt = getKey(row, "invoice date");
        let txval = num2(getKey(row, "taxable value"));
        let rt = num2(getKey(row, "rate"));
        let csamt = num2(getKey(row, "cess"));
        
        let iamt = num2(getKey(row, "integrated tax", "igst"));
        if (typ === "WPAY" && !iamt) iamt = num2(txval * (rt/100));

        let val = num2(getKey(row, "invoice value")) || num2(txval + iamt + csamt);

        if (!inum || txval <= 0) return;
        if (!map[typ]) map[typ] = {};
        if (!map[typ][inum]) {
            map[typ][inum] = { inum, idt, val, itms: [] };
            stats.exp.count++;
        }
        
        let itmObj = { num: map[typ][inum].itms.length + 1, itm_det: { txval, rt, csamt } };
        if(iamt > 0) itmObj.itm_det.iamt = iamt;
        map[typ][inum].itms.push(itmObj);

        stats.exp.txval += txval; stats.exp.igst += iamt; stats.exp.cess += csamt;
    });
    for (const [exp_typ, invs] of Object.entries(map)) {
        finalGstJson.exp.push({ exp_typ, inv: Object.values(invs) });
    }
}

function processNIL(data) {
    let invs = [];
    data.forEach((row, index) => {
        let inum = getKey(row, "invoice number", "inum");
        let idt = getKey(row, "invoice date", "idt");
        let val = num2(getKey(row, "invoice value", "val"));
        let pos = getKey(row, "place of supply", "pos");
        if (!inum || val <= 0) return;
        invs.push({
            inum,
            idt,
            val,
            pos: (pos || '').toString().split('-')[0].trim(),
            ety: getKey(row, 'nature of supply', 'supply type') || 'OE',
            rt: num2(getKey(row, 'rate')),
            num: index + 1
        });
    });
    if (invs.length > 0) {
        finalGstJson.nil.inv = invs;
    }
}

function processHSN(data) {
    data.forEach((row, i) => {
        let hsn_sc = (getKey(row, "hsn", "hsn code", "hsn/sc") || "").toString();
        let txval = num2(getKey(row, "total value", "taxable value", "taxable amount", "amount"));
        let rt = num2(getKey(row, "rate"));
        let csamt = num2(getKey(row, "cess"));

        let iamt = num2(getKey(row, "integrated tax", "igst"));
        let camt = num2(getKey(row, "central tax", "cgst"));
        let samt = num2(getKey(row, "state/ut tax", "sgst"));
        let qty = num2(getKey(row, "total quantity", "qty", "quantity"));
        let desc = getKey(row, "description", "item description", "goods description") || "Goods";
        let uqc = getKey(row, "uqc", "unit") || "OTH";

        const hasHsnSignals = hsn_sc && (txval > 0 || qty > 0 || desc || uqc);
        if (!hasHsnSignals) return;

        let obj = {
            num: i + 1, hsn_sc,
            desc,
            uqc,
            qty,
            rt, txval, iamt, samt, camt, csamt
        };
        finalGstJson.hsn.hsn_b2b.push(obj);

        stats.hsn.count++;
        stats.hsn.txval += txval; stats.hsn.igst += iamt;
        stats.hsn.cgst += camt; stats.hsn.sgst += samt; stats.hsn.cess += csamt;
    });
}

function processDOCS(data) {
    let docMap = {};
    data.forEach((row, i) => {
        let doc_typ = getKey(row, "nature of document") || "Invoices for outward supply";
        let from = (getKey(row, "from") || "").toString();
        let to = (getKey(row, "to") || "").toString();
        let totnum = parseInt(getKey(row, "total number")) || 0;
        let cancel = parseInt(getKey(row, "cancelled")) || 0;
        
        if (from && totnum > 0) {
            if (!docMap[doc_typ]) docMap[doc_typ] = [];
            docMap[doc_typ].push({ num: i + 1, from, to, totnum, cancel, net_issue: totnum - cancel });
            stats.docs.count += totnum;
        }
    });

    let dNum = 1;
    for (const [doc_typ, docs] of Object.entries(docMap)) {
        finalGstJson.doc_issue.doc_det.push({ doc_num: dNum++, doc_typ, docs });
    }
}

// --- DASHBOARD UPDATES & EXPORTS ---

function clearWorkspace() {
    if(confirm('Clear all processed memory?')) {
        finalGstJson = getBlankGstJson();
        stats = blankStats();
        updateUIStats();
        document.getElementById('fileUpload').value = "";
    }
}

function updateUIStats() {
    const tbody = document.getElementById('summaryTableBody');
    const tfoot = document.getElementById('summaryTableFoot');
    tbody.innerHTML = '';
    
    const sections = [
        {id: 'b2b', label: 'B2B Invoices'}, {id: 'b2cs', label: 'B2C (Small)'},
        {id: 'cdnr', label: 'Credit/Debit Notes'}, {id: 'exp', label: 'Exports'},
        {id: 'hsn', label: 'HSN Summary'}, {id: 'docs', label: 'Documents Issued'}
    ];

    let tCount = 0, tTxval = 0, tIgst = 0, tCgst = 0, tSgst = 0, tCess = 0;

    sections.forEach(sec => {
        const s = stats[sec.id];
        if (s.count === 0) return;

        tCount += s.count; tTxval += s.txval; tIgst += s.igst;
        tCgst += s.cgst; tSgst += s.sgst; tCess += s.cess;

        tbody.innerHTML += `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-4 py-2 border-b border-slate-50 font-bold">${sec.label}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-center bg-slate-50/50">${s.count}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-right text-slate-900">${s.txval.toFixed(2)}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-right">${s.igst.toFixed(2)}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-right">${s.cgst.toFixed(2)}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-right">${s.sgst.toFixed(2)}</td>
                <td class="px-4 py-2 border-b border-slate-50 text-right">${s.cess.toFixed(2)}</td>
            </tr>
        `;
    });

    if (tCount === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-10 text-slate-400 italic">No data processed yet.</td></tr>`;
        tfoot.innerHTML = '';
        document.getElementById('btnDownloadJSON').disabled = true;
        document.getElementById('btnDownloadJSON').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('btnDownloadSummary').disabled = true;
        document.getElementById('btnDownloadSummary').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('btnDownloadFormattedWorkbook').disabled = true;
        document.getElementById('btnDownloadFormattedWorkbook').classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        tfoot.innerHTML = `
            <tr>
                <td class="px-4 py-3 uppercase tracking-wider text-xs">Total</td>
                <td class="px-4 py-3 text-center">${tCount}</td>
                <td class="px-4 py-3 text-right">${tTxval.toFixed(2)}</td>
                <td class="px-4 py-3 text-right">${tIgst.toFixed(2)}</td>
                <td class="px-4 py-3 text-right">${tCgst.toFixed(2)}</td>
                <td class="px-4 py-3 text-right">${tSgst.toFixed(2)}</td>
                <td class="px-4 py-3 text-right">${tCess.toFixed(2)}</td>
            </tr>
        `;
        document.getElementById('btnDownloadJSON').disabled = false;
        document.getElementById('btnDownloadJSON').classList.remove('opacity-50', 'cursor-not-allowed');
        document.getElementById('btnDownloadSummary').disabled = false;
        document.getElementById('btnDownloadSummary').classList.remove('opacity-50', 'cursor-not-allowed');
        document.getElementById('btnDownloadFormattedWorkbook').disabled = false;
        document.getElementById('btnDownloadFormattedWorkbook').classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function styleSheet(ws, headerCount) {
    ws['!cols'] = Array.from({ length: headerCount }, (_, index) => ({ wch: 18 }));
    const headerStyle = { font: { bold: true, color: { rgb: 'FFFFFFFF' } }, fill: { fgColor: { rgb: 'FF2563EB' } }, alignment: { vertical: 'center' } };
    const bodyStyle = { fill: { fgColor: { rgb: 'FFF8FAFC' } }, alignment: { vertical: 'center' } };
    for (let c = 0; c < headerCount; c++) {
        const headerRef = XLSX.utils.encode_cell({ r: 0, c });
        if (ws[headerRef]) ws[headerRef].s = headerStyle;
        for (let r = 1; r < 1000; r++) {
            const cellRef = XLSX.utils.encode_cell({ r, c });
            if (ws[cellRef]) ws[cellRef].s = bodyStyle;
        }
    }
    ws['!freeze'] = { xSplit: 0, ySplit: 1 };
}

function buildFormattedWorkbook() {
    const gstin = document.getElementById('gstinInput').value.trim().toUpperCase();
    const fp = document.getElementById('fpInput').value.trim();
    const wb = XLSX.utils.book_new();

    const addSheet = (sheetName, headers, rows) => {
        const ws = XLSX.utils.aoa_to_sheet([[...headers], ...rows]);
        styleSheet(ws, headers.length);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
    };

    const summaryRows = [];
    let totalCount = 0, totalTxval = 0, totalIgst = 0, totalCgst = 0, totalSgst = 0, totalCess = 0;
    const sectionOrder = [
        { key: 'b2b', label: 'B2B' },
        { key: 'b2cs', label: 'B2CS' },
        { key: 'cdnr', label: 'CDNR' },
        { key: 'exp', label: 'EXP' },
        { key: 'hsn', label: 'HSN' },
        { key: 'docs', label: 'DOCS' }
    ];
    sectionOrder.forEach(({ key, label }) => {
        const s = stats[key] || stats.docs;
        if (!s || s.count <= 0) return;
        summaryRows.push([label, s.count, s.txval.toFixed(2), s.igst.toFixed(2), s.cgst.toFixed(2), s.sgst.toFixed(2), s.cess.toFixed(2)]);
        totalCount += s.count; totalTxval += s.txval; totalIgst += s.igst; totalCgst += s.cgst; totalSgst += s.sgst; totalCess += s.cess;
    });
    summaryRows.push(["TOTAL", totalCount, totalTxval.toFixed(2), totalIgst.toFixed(2), totalCgst.toFixed(2), totalSgst.toFixed(2), totalCess.toFixed(2)]);
    addSheet('SummarySample', ['Section', 'Record Count', 'Taxable Value', 'IGST', 'CGST', 'SGST', 'CESS'], summaryRows);

    const b2bRows = [];
    finalGstJson.b2b.forEach(({ ctin, inv }) => {
        inv.forEach((invoice) => {
            const base = { ctin: ctin || '', inum: invoice.inum || '', idt: invoice.idt || '', val: invoice.val || 0, pos: invoice.pos || '', rchrg: invoice.rchrg || '', inv_typ: invoice.inv_typ || '' };
            (invoice.itms || []).forEach((item, index) => {
                const det = item.itm_det || {};
                b2bRows.push([base.ctin, base.inum, base.idt, base.val, base.pos, base.rchrg, base.inv_typ, index + 1, det.rt || '', det.txval || '', det.iamt || '', det.camt || '', det.samt || '', det.csamt || '']);
            });
        });
    });
    addSheet('B2B', ['Recipient GSTIN', 'Invoice No', 'Invoice Date', 'Invoice Value', 'Place of Supply', 'Reverse Charge', 'Invoice Type', 'Item No', 'Rate', 'Taxable Value', 'IGST', 'CGST', 'SGST', 'CESS'], b2bRows);

    const b2csRows = [];
    finalGstJson.b2cs.forEach((row) => {
        b2csRows.push([row.sply_ty || '', row.rt || '', row.typ || '', row.pos || '', row.txval || '', row.iamt || '', row.camt || '', row.samt || '', row.csamt || '']);
    });
    addSheet('B2CS', ['Supply Type', 'Rate', 'Type', 'Place of Supply', 'Taxable Value', 'IGST', 'CGST', 'SGST', 'CESS'], b2csRows);

    const cdnrRows = [];
    finalGstJson.cdnr.forEach(({ ctin, nt }) => {
        (nt || []).forEach((note) => {
            (note.itms || []).forEach((item, index) => {
                const det = item.itm_det || {};
                cdnrRows.push([ctin || '', note.nt_num || '', note.nt_dt || '', note.val || '', note.pos || '', note.ntty || '', note.rchrg || '', note.inv_typ || '', index + 1, det.rt || '', det.txval || '', det.iamt || '', det.camt || '', det.samt || '', det.csamt || '']);
            });
        });
    });
    addSheet('CDNR', ['Recipient GSTIN', 'Note No', 'Note Date', 'Note Value', 'Place of Supply', 'Note Type', 'Reverse Charge', 'Invoice Type', 'Item No', 'Rate', 'Taxable Value', 'IGST', 'CGST', 'SGST', 'CESS'], cdnrRows);

    const expRows = [];
    finalGstJson.exp.forEach(({ exp_typ, inv }) => {
        (inv || []).forEach((invoice) => {
            (invoice.itms || []).forEach((item, index) => {
                const det = item.itm_det || {};
                expRows.push([exp_typ || '', invoice.inum || '', invoice.idt || '', invoice.val || '', index + 1, det.rt || '', det.txval || '', det.iamt || '', det.csamt || '']);
            });
        });
    });
    addSheet('EXP', ['Export Type', 'Invoice No', 'Invoice Date', 'Invoice Value', 'Item No', 'Rate', 'Taxable Value', 'IGST', 'CESS'], expRows);

    const hsnRows = [];
    (finalGstJson.hsn && finalGstJson.hsn.hsn_b2b || []).forEach((row) => {
        hsnRows.push([row.hsn_sc || '', row.desc || '', row.uqc || '', row.qty || '', row.rt || '', row.txval || '', row.iamt || '', row.samt || '', row.camt || '', row.csamt || '']);
    });
    addSheet('HSN', ['HSN Code', 'Description', 'UQC', 'Quantity', 'Rate', 'Taxable Value', 'IGST', 'SGST', 'CGST', 'CESS'], hsnRows);

    const nilRows = [];
    (finalGstJson.nil && finalGstJson.nil.inv || []).forEach((row) => {
        nilRows.push([row.inum || '', row.idt || '', row.val || '', row.pos || '', row.ety || '', row.rt || '', row.num || '']);
    });
    addSheet('NIL', ['Invoice No', 'Invoice Date', 'Invoice Value', 'Place of Supply', 'Nature of Supply', 'Rate', 'Serial No'], nilRows);

    const docsRows = [];
    finalGstJson.doc_issue && finalGstJson.doc_issue.doc_det.forEach((doc) => {
        (doc.docs || []).forEach((entry) => {
            docsRows.push([doc.doc_typ || '', entry.from || '', entry.to || '', entry.totnum || '', entry.cancel || '', entry.net_issue || '']);
        });
    });
    addSheet('DOCS', ['Document Type', 'From', 'To', 'Total Number', 'Cancelled', 'Net Issued'], docsRows);

    XLSX.writeFile(wb, `GSTR1_Format_${fp || 'return'}_${gstin || 'GSTIN'}.xlsx`);
}

document.getElementById('btnDownloadJSON').addEventListener('click', () => {
    finalGstJson.gstin = document.getElementById('gstinInput').value.trim().toUpperCase();
    finalGstJson.fp = document.getElementById('fpInput').value.trim();
    
    // Strictly Clean Empty Arrays to match Government Tool rules
    const clean = JSON.parse(JSON.stringify(finalGstJson));
    ['b2b', 'b2cs', 'exp', 'cdnr'].forEach(k => { if (clean[k] && clean[k].length === 0) delete clean[k]; });
    if (clean.nil && clean.nil.inv && clean.nil.inv.length === 0) delete clean.nil;
    if (clean.hsn && clean.hsn.hsn_b2b.length === 0) delete clean.hsn;
    if (clean.doc_issue && clean.doc_issue.doc_det && clean.doc_issue.doc_det.length === 0) delete clean.doc_issue;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clean));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `returns_${finalGstJson.fp}_R1_${finalGstJson.gstin}_offline.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
});

document.getElementById('btnDownloadFormattedWorkbook').addEventListener('click', () => {
    buildFormattedWorkbook();
});

document.getElementById('btnDownloadSummary').addEventListener('click', () => {
    const gstin = document.getElementById('gstinInput').value.trim().toUpperCase();
    const fp = document.getElementById('fpInput').value.trim();

    let summaryRows = [];
    summaryRows.push(["GSTR-1 Summary"]);
    summaryRows.push(["GSTIN", gstin || ""]);
    summaryRows.push(["Month/Year", fp || ""]);
    summaryRows.push([]);
    summaryRows.push(["Section", "Record Count", "Taxable Value", "IGST", "CGST", "SGST", "CESS"]);

    let totalCount = 0, totalTxval = 0, totalIgst = 0, totalCgst = 0, totalSgst = 0, totalCess = 0;
    for (const [key, s] of Object.entries(stats)) {
        if (s.count > 0) {
            summaryRows.push([key.toUpperCase(), s.count, s.txval.toFixed(2), s.igst.toFixed(2), s.cgst.toFixed(2), s.sgst.toFixed(2), s.cess.toFixed(2)]);
            totalCount += s.count; totalTxval += s.txval; totalIgst += s.igst; totalCgst += s.cgst; totalSgst += s.sgst; totalCess += s.cess;
        }
    }

    summaryRows.push(["TOTAL", totalCount, totalTxval.toFixed(2), totalIgst.toFixed(2), totalCgst.toFixed(2), totalSgst.toFixed(2), totalCess.toFixed(2)]);

    const ws = XLSX.utils.aoa_to_sheet(summaryRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GSTR-1 Summary");

    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];
    ws['!cols'] = [
        { wch: 18 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }
    ];

    const boldStyle = { font: { bold: true }, fill: { fgColor: { rgb: 'FFF1F5F9' } } };
    const titleStyle = { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: 'FFE0F2FE' } } };

    const applyStyle = (rowIndex, style) => {
        for (let c = 0; c < 7; c++) {
            const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c });
            if (ws[cellRef]) ws[cellRef].s = style;
        }
    };

    applyStyle(0, titleStyle);
    applyStyle(4, boldStyle);
    const totalRow = summaryRows.length - 1;
    applyStyle(totalRow, boldStyle);

    XLSX.writeFile(wb, `GSTR1_Summary_${fp || 'return'}.xlsx`);
});
