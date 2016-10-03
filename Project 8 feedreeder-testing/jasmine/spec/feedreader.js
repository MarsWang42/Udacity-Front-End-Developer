/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                // Use regex to check whether the url is legal or not.
                expect(feed.url).toMatch(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        var body = $('body');
        var menuButton = $('.menu-icon-link');

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should be able to be controlled by the toggle button', function() {
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {

            beforeEach(function(done) {
                loadFeed(0, done);
            });
            /* A test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test will require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */
            it('should have at least one entry after loading', function() {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });

        });

    describe('New Feed Selection', function() {
        var initialContent;
        var changedContent;

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
              initialContent = $('.feed').html();
              // Call loadFeed once again after the first one is done.
              loadFeed(1, function(){
                changedContent = $('.feed').html();
                done();
              });
            });
        });

        it('changes when new content loaded', function() {
            expect(changedContent).not.toBe(initialContent);
        });
    });
}());
