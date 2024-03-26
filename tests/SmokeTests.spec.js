import { test, expect } from '@playwright/test'
import { Login } from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { Portals } from '../pages/portals'
import { Order } from '../pages/order'
import { Checkout } from '../pages/checkout'
import { Settings } from '../pages/settings'
import { FAQ } from '../pages/FAQ'
const ExcelJS = require('exceljs');

test.describe.configure({ mode: 'serial' })

let page;
let login;
let dashboard;
let portals;
let order;
let checkout;
let settings;
let faq;
let workbook;
let dataSheet;
let cardDetailsSheet;
let testData = {};
let cardDetails = {};

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new Login(page)
    dashboard = new Dashboard(page)
    portals = new Portals(page)
    order = new Order(page)
    checkout = new Checkout(page)
    settings = new Settings(page)
    faq = new FAQ(page)
    workbook = await new ExcelJS.Workbook().xlsx.readFile('data.xlsx');
    dataSheet = workbook.getWorksheet('SmokeTests');
    cardDetailsSheet = workbook.getWorksheet('CardDetails');

    dataSheet.eachRow(function (row, rowNumber) {
        if (rowNumber > 1) {
            testData[row.values[1]] = row.values[2];
        }
    })
    cardDetailsSheet.eachRow(function (row, rowNumber) {
        if (rowNumber > 1) {
            cardDetails[row.values[1]] = row.values[2];
        }
    })
});

test('Login', async () => {
    await login.goto()
    await login.login(testData.emailAddress, testData.apiKey)
})

test.fail('Create Order', async () => {
    await dashboard.selectPortal(testData.portalName)
    await portals.clickEligibility()
    await order.searchAddress(testData.address)
    await order.selectFirstOption()
    await order.clickCheckout()
    await checkout.fillDetails(testData.firstName, testData.lastName, testData.phoneNumber)
    await checkout.confirmOrder()
    await checkout.fillStripeDetails(cardDetails.cardNumber, cardDetails.cardExpiry, cardDetails['CVC'], cardDetails.billingName, cardDetails.country, cardDetails.zipCode)
})

test('Verify FAQ page', async () => {
    await dashboard.openFAQ()
    await faq.validateFAQ()
})

test('Sign Out', async () => {
    await dashboard.signOut()
})