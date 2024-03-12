import { test, expect } from '@playwright/test'
import { Login } from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { Portals } from '../pages/portals'
import { Order } from '../pages/order'
import { Checkout } from '../pages/checkout'
import { Settings } from '../pages/settings'
const ExcelJS = require('exceljs');

test.describe.configure({ mode: 'serial' })

let page;
let login;
let dashboard;
let portals;
let order;
let checkout;
let settings;
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

test('Create Order', async () => {
    await dashboard.selectPortal(testData.portalName)
    await portals.clickBookPickup()
    await order.searchAddress(testData.address)
    await order.selectFirstOption()
    await order.clickCheckout()
    await checkout.fillDetails(testData.firstName, testData.lastName, testData.phoneNumber)
    await checkout.confirmOrder()
    await checkout.fillStripeDetails(cardDetails.cardNumber, cardDetails.cardExpiry, cardDetails['CVC'], cardDetails.billingName,cardDetails.country,cardDetails.zipCode)
})

test('Sign Out', async () => {
    await dashboard.signOut()
})

test('Change User Name', async () => {
    await dashboard.openSettings()
    await settings.updateUserName(data.newFirstName, data.newLastName)
})
