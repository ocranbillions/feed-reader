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


        it('ensures url is defined & not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        it('ensures name is defined & not empty', function() {
            for(let feed of allFeeds){                
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
     });


    /* This suite ensures menu element is hidden by default
     * It also checks if menu's visibility toggles off & on
     * in response to clicks on the menu icon
     */
    describe('The menu', function() {       
        //Grab the body element            
        let bodyElement = document.querySelector('body');      

        //variable to hold the visibility state of the menu    
        let hiddenMenu;

        it('should be hidden', function() {
            //checks if menu is hidden by default
            hiddenMenu = bodyElement.classList.contains('menu-hidden') ? true : false;
            expect(hiddenMenu).toBe(true);
        });


        it('should toggle Off & On', function() {
            //Grab the menu icon
            const menuIcon = document.querySelector('.menu-icon-link');

            //Click the menu  icon [.click() stimulates a mouse click on an element]
            menuIcon.click();   

            //checks if .menu-hidden is removed after the above click
            //i.e menu should now be visible
            hiddenMenu = bodyElement.classList.contains('menu-hidden') ? true : false;            
            expect(hiddenMenu).toBe(false);

            //Click menu icon again
            menuIcon.click();

            //Checks if .menu-hidden is re-applied to the menu
            //i.e. menu should be hidden again
            hiddenMenu = bodyElement.classList.contains('menu-hidden') ? true : false;
            expect(hiddenMenu).toBe(true);
        });
    });     

    /* This suite checks that there is at least a single .entry element 
     * within feed container whenever loadFeed is called
     */
    describe('Initial Entries', function() {
        //Perform and complete a loadFeed operation before proceeding with test.
        beforeEach(function(done) {
            //Load feed via async and notify jasmine when done
            loadFeed(0, done);
        });

        it('ensures there is at least a single feed entry', function() {
            //expects at least 1 entry
            let entries = document.querySelector('.feed').querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0) ;
        });

        //This suite checks if content changes after a new feed is loaded
        describe('New Feed Selection', function() {
            let feedContainer = document.querySelector('.feed');  
            let firstFeedsFirstChild, secondFeedsFirstChild;

            //Perform and complete a loadFeed operation before proceeding with test.
            beforeEach(function(done) {
                //Load first feed
                loadFeed(0, function() {
                    //Store it's first content
                    firstFeedsFirstChild = feedContainer.firstElementChild.innerText; 

                    //load new feed
                    loadFeed(1, function() {
                        //Store it's first content
                        secondFeedsFirstChild = feedContainer.firstElementChild.innerText;

                        //Notify jasmine async work is done
                        done();
                    });
                });                
            });


            //Compare first content of first feed with 
            //first content of second feed   
            it('ensures content changes', function() {        
                expect(firstFeedsFirstChild === secondFeedsFirstChild).toBe(false);
            });
        });
    });
}());
