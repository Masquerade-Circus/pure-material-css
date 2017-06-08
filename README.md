# Pure Material
[https://masquerade-circus.github.io/pure-material-css/](https://masquerade-circus.github.io/pure-material-css/#about)

* * *

## What is Pure Material?

It's a css framework whose sole purpose is to make extremely simple to build applications with the appearance of material design by using simple HTML5.  

So, you just write HTML5 and get Material Design. No javascript, just pure css.

* * *

## What are the rules?

*   Don't style with classes. Classes must be only helpers or utility classes.
*   Try to use only pseudo selectors like ::before and ::after to add styles.
*   Use additional markup only when it's strictly necessary.
*   Use real html tags or attributes for components that already exists on the w3c specification.
*   Use css transitions and animations instead of javascript plugins.
*   In fact, don't use javascript at all.

* * *

## Why is Pure Material framework friendly?

Pure Material css isn't based on css conventions like OOCSS, SMACSS or BEM, instead it tries to be html5 compliant without overpopulating your html with a bunch of css classes. To do this it takes a different approach of styling components.  

Each component, except of those who already have an html tag like "menu" or "dialog", is declared with a data attribute (Data driven CSS). This gives you the freedom to style, toggle or remove any css class that you want, leaving the path free to any framework you use without getting in the way of the Pure Material styles.  

All animations can be activated by toggling a simple param on the data attribute without the need of third party javascript plugins. Just use your framework to add or remove a property.  

Consider the following example of creating a card with Pure Material and compare it with the same [MDL component](https://getmdl.io/components/index.html#cards-section) :  

```html
<section data-card data-elevation="hover-16">
    <section data-card-media style="background-image: url(https://getmdl.io/assets/demos/welcome_card.jpg)">
        <header>
            <h2>Welcome</h2>
            <nav>
                <button data-fab="inline mini">
                    <i class="material-icons">share</i>
                </button>
            </nav>
        </header>
    </section>
    <section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris sagittis pellentesque lacus eleifend lacinia...
    </section>
    <footer>
        <nav>
            <button data-button="primary">Get started</button>
        </nav>
    </footer>
</section>
```

* * *

## Why are you doing this? Why not Google's MDL?

Because write and markup an app should be as simple as write plain html and nothing more.  

I'm not in war with google's mdl. If you like the way it works, if you depend on a component that hasn't yet been integrated here, if you just want to use it because it's Google, then, use MDL.  

This framework is not for all developers. And certainly it's not a must to have to every project.  

But, if you have very little time to make a good looking app, if you just want a quick prototype, if you want to have your app framework friendly and third party plugin's free, and want to keep your code clean, then, give Pure Material a try.  

* * *

## And who are you?

My name is Christian César Robledo López aka [Masquerade Circus](http://masquerade-circus.net).  
I'm just a developer like any other one. I started to write code since i was fourteen years old. And i just like to build and invent new things.  
If interested, you can visit my github account at [https://github.com/Masquerade-Circus](https://github.com/Masquerade-Circus)
***
## Legal

Author: [Masquerade Circus](http://masquerade-circus.net). License [Apache-2.0](https://opensource.org/licenses/Apache-2.0)
