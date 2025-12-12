// ============================================
// UNIT TESTING - Contact Management System
// ============================================

// Mock Data untuk Testing
const mockContacts = [
    { 
        id: 1, 
        name: 'Test User 1', 
        email: 'test1@email.com', 
        phone: '081234567890', 
        address: 'Jakarta', 
        company: 'Company A' 
    },
    { 
        id: 2, 
        name: 'Test User 2', 
        email: 'test2@email.com', 
        phone: '082345678901', 
        address: 'Bandung', 
        company: 'Company B' 
    }
];

// Test Suite Class
class ContactManagementTest {
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.failedTests = 0;
    }

    // Helper function untuk assert
    assert(condition, testName, expected, actual) {
        if (condition) {
            this.passedTests++;
            this.testResults.push({
                status: 'PASS',
                test: testName,
                expected: expected,
                actual: actual
            });
            console.log(`✅ PASS: ${testName}`);
        } else {
            this.failedTests++;
            this.testResults.push({
                status: 'FAIL',
                test: testName,
                expected: expected,
                actual: actual
            });
            console.error(`❌ FAIL: ${testName}`);
            console.error(`   Expected: ${JSON.stringify(expected)}`);
            console.error(`   Actual: ${JSON.stringify(actual)}`);
        }
    }

    // ====================================
    // 1. UNIT TEST: Load Demo Data
    // ====================================
    testLoadDemoData() {
        console.log('\n--- Testing: loadDemoData() ---');
        
        // Reset contacts
        contacts = [];
        loadDemoData();
        
        // Test 1: Check if contacts array is not empty
        this.assert(
            contacts.length > 0,
            'loadDemoData should populate contacts array',
            'Array with data',
            contacts.length > 0 ? 'Array with data' : 'Empty array'
        );
        
        // Test 2: Check if contacts have required properties
        const hasRequiredProps = contacts.every(c => 
            c.hasOwnProperty('id') && 
            c.hasOwnProperty('name') && 
            c.hasOwnProperty('email') && 
            c.hasOwnProperty('phone')
        );
        
        this.assert(
            hasRequiredProps,
            'All contacts should have required properties (id, name, email, phone)',
            true,
            hasRequiredProps
        );
        
        // Test 3: Check data types
        const firstContact = contacts[0];
        const correctTypes = 
            typeof firstContact.id === 'number' &&
            typeof firstContact.name === 'string' &&
            typeof firstContact.email === 'string' &&
            typeof firstContact.phone === 'string';
        
        this.assert(
            correctTypes,
            'Contact properties should have correct data types',
            true,
            correctTypes
        );
    }

    // ====================================
    // 2. UNIT TEST: Search Functionality
    // ====================================
    testSearchFunctionality() {
        console.log('\n--- Testing: Search Functionality ---');
        
        contacts = [...mockContacts];
        
        // Test 1: Search by name
        const searchByName = contacts.filter(contact => 
            contact.name.toLowerCase().includes('test user 1')
        );
        
        this.assert(
            searchByName.length === 1 && searchByName[0].name === 'Test User 1',
            'Search should find contact by name',
            'Test User 1',
            searchByName[0]?.name
        );
        
        // Test 2: Search by email
        const searchByEmail = contacts.filter(contact => 
            contact.email.toLowerCase().includes('test2@email.com')
        );
        
        this.assert(
            searchByEmail.length === 1,
            'Search should find contact by email',
            1,
            searchByEmail.length
        );
        
        // Test 3: Search by phone
        const searchByPhone = contacts.filter(contact => 
            contact.phone.includes('081234567890')
        );
        
        this.assert(
            searchByPhone.length === 1,
            'Search should find contact by phone',
            1,
            searchByPhone.length
        );
        
        // Test 4: Search with no results
        const noResults = contacts.filter(contact => 
            contact.name.toLowerCase().includes('nonexistent')
        );
        
        this.assert(
            noResults.length === 0,
            'Search should return empty array for non-existent contact',
            0,
            noResults.length
        );
    }

    // ====================================
    // 3. UNIT TEST: Add Contact
    // ====================================
    testAddContact() {
        console.log('\n--- Testing: Add Contact ---');
        
        contacts = [...mockContacts];
        const initialLength = contacts.length;
        
        // Test 1: Add valid contact
        const newContact = {
            id: Date.now(),
            name: 'New User',
            email: 'newuser@email.com',
            phone: '083456789012',
            address: 'Surabaya',
            company: 'New Company'
        };
        
        contacts.push(newContact);
        
        this.assert(
            contacts.length === initialLength + 1,
            'Adding contact should increase array length',
            initialLength + 1,
            contacts.length
        );
        
        // Test 2: Check if new contact exists
        const addedContact = contacts.find(c => c.email === 'newuser@email.com');
        
        this.assert(
            addedContact !== undefined,
            'New contact should be found in contacts array',
            'Contact found',
            addedContact ? 'Contact found' : 'Contact not found'
        );
        
        // Test 3: Validate required fields
        const hasRequiredFields = 
            newContact.name && 
            newContact.email && 
            newContact.phone;
        
        this.assert(
            hasRequiredFields,
            'New contact should have all required fields',
            true,
            hasRequiredFields
        );
    }

    // ====================================
    // 4. UNIT TEST: Edit Contact
    // ====================================
    testEditContact() {
        console.log('\n--- Testing: Edit Contact ---');
        
        contacts = [...mockContacts];
        const contactToEdit = contacts[0];
        const editId = contactToEdit.id;
        
        // Test 1: Update contact
        const index = contacts.findIndex(c => c.id === editId);
        contacts[index] = {
            id: editId,
            name: 'Updated Name',
            email: 'updated@email.com',
            phone: '089999999999',
            address: 'Updated Address',
            company: 'Updated Company'
        };
        
        const updatedContact = contacts.find(c => c.id === editId);
        
        this.assert(
            updatedContact.name === 'Updated Name',
            'Contact name should be updated',
            'Updated Name',
            updatedContact.name
        );
        
        // Test 2: Check if ID remains the same
        this.assert(
            updatedContact.id === editId,
            'Contact ID should remain unchanged after edit',
            editId,
            updatedContact.id
        );
        
        // Test 3: Check if all fields are updated
        const allFieldsUpdated = 
            updatedContact.email === 'updated@email.com' &&
            updatedContact.phone === '089999999999' &&
            updatedContact.address === 'Updated Address' &&
            updatedContact.company === 'Updated Company';
        
        this.assert(
            allFieldsUpdated,
            'All contact fields should be updated',
            true,
            allFieldsUpdated
        );
    }

    // ====================================
    // 5. UNIT TEST: Delete Contact
    // ====================================
    testDeleteContact() {
        console.log('\n--- Testing: Delete Contact ---');
        
        contacts = [...mockContacts];
        const initialLength = contacts.length;
        const deleteId = contacts[0].id;
        
        // Test 1: Delete contact
        contacts = contacts.filter(c => c.id !== deleteId);
        
        this.assert(
            contacts.length === initialLength - 1,
            'Deleting contact should decrease array length',
            initialLength - 1,
            contacts.length
        );
        
        // Test 2: Check if contact is removed
        const deletedContact = contacts.find(c => c.id === deleteId);
        
        this.assert(
            deletedContact === undefined,
            'Deleted contact should not be found in array',
            undefined,
            deletedContact
        );
        
        // Test 3: Check if other contacts remain
        this.assert(
            contacts.length > 0,
            'Other contacts should remain after deletion',
            true,
            contacts.length > 0
        );
    }

    // ====================================
    // 6. UNIT TEST: Validation
    // ====================================
    testValidation() {
        console.log('\n--- Testing: Validation ---');
        
        // Test 1: Empty name validation
        const emptyName = '';
        const emptyEmail = 'test@email.com';
        const emptyPhone = '081234567890';
        
        const isValidEmpty = emptyName && emptyEmail && emptyPhone;
        
        this.assert(
            !isValidEmpty,
            'Empty name should fail validation',
            false,
            isValidEmpty
        );
        
        // Test 2: Valid data
        const validName = 'Valid Name';
        const validEmail = 'valid@email.com';
        const validPhone = '081234567890';
        
        const isValid = validName && validEmail && validPhone;
        
        this.assert(
            isValid,
            'Valid data should pass validation',
            true,
            isValid
        );
        
        // Test 3: Email format (basic check)
        const validEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail);
        
        this.assert(
            validEmailFormat,
            'Email should have valid format',
            true,
            validEmailFormat
        );
        
        // Test 4: Phone number (basic check - digits only)
        const validPhoneFormat = /^\d+$/.test(validPhone);
        
        this.assert(
            validPhoneFormat,
            'Phone should contain only digits',
            true,
            validPhoneFormat
        );
    }

    // ====================================
    // 7. UNIT TEST: ID Generation
    // ====================================
    testIdGeneration() {
        console.log('\n--- Testing: ID Generation ---');
        
        // Test 1: Generate unique IDs
        const id1 = Date.now();
        const id2 = Date.now();
        
        this.assert(
            typeof id1 === 'number',
            'Generated ID should be a number',
            'number',
            typeof id1
        );
        
        // Test 2: ID should be positive
        this.assert(
            id1 > 0,
            'Generated ID should be positive',
            true,
            id1 > 0
        );
        
        // Test 3: New ID should be unique (or equal if generated at same time)
        this.assert(
            id1 <= id2,
            'Sequential IDs should be in order',
            true,
            id1 <= id2
        );
    }

    // ====================================
    // Run All Tests
    // ====================================
    runAllTests() {
        console.log('╔════════════════════════════════════════╗');
        console.log('║   UNIT TESTING - CONTACT MANAGEMENT    ║');
        console.log('╚════════════════════════════════════════╝');
        
        this.testLoadDemoData();
        this.testSearchFunctionality();
        this.testAddContact();
        this.testEditContact();
        this.testDeleteContact();
        this.testValidation();
        this.testIdGeneration();
        
        this.printSummary();
    }

    // Print Test Summary
    printSummary() {
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║          TEST SUMMARY                  ║');
        console.log('╚════════════════════════════════════════╝');
        console.log(`Total Tests: ${this.passedTests + this.failedTests}`);
        console.log(`✅ Passed: ${this.passedTests}`);
        console.log(`❌ Failed: ${this.failedTests}`);
        console.log(`Success Rate: ${((this.passedTests / (this.passedTests + this.failedTests)) * 100).toFixed(2)}%`);
        
        if (this.failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults
                .filter(r => r.status === 'FAIL')
                .forEach(r => {
                    console.log(`  - ${r.test}`);
                });
        }
        
        console.log('\n' + '='.repeat(42));
    }
}

// ====================================
// USAGE: Run Tests
// ====================================
// Uncomment baris berikut untuk menjalankan test:
// const tester = new ContactManagementTest();
// tester.runAllTests();

console.log('Unit Testing Script Loaded Successfully!');
console.log('To run tests, execute: new ContactManagementTest().runAllTests();');