## Website Performance Optimization portfolio project

###Part 1: Optimize PageSpeed Insights score for index.html

What I've done:

1. Compressing all the js and css files.
2. Inlining the style css.
3. To unblock css file of print, giving it a media attribute of "print".
4. Moving all the scripting to the end of the html to unblock.


###Part 2: Optimize Frames per Second in pizza.html

What I've done:

1. In the resizePizzas function, I've moved out the dx and newwidth calculation out of the iteration and cached the DOM access.
2. The pizzasDiv has been moved out of the iteration to improve loading performance.
3. In the updatePositions function, I've made a new iteration to calculate phase. It will only take 5 numbers.
4. The number of required pizzas have been calculate dynamicly.
5. All querySelectorAll() and querySelector() functions have been replaced by getElementsByClassName() and getElementById().


### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
