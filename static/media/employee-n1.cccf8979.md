# What It's Like Being Employee No.1

For the last 5 and a half years I have been working for a startup in London. It was the first thing I did out of university and I was officially employee No.1. 

The company [import.io](https://www.crunchbase.com/organization/importio) is now thriving with around 35 employees and plenty of funding.

I wanted to write about some of the best, worst and most pivotal points of the company that I've seen since I've been there.

## The Beginning

I had just graduated with a Masters in Applied Cybernetics and to be honest, at the beginning of the company I had absolutely no idea how to build anything that the company wanted.
My background was mainly in robotics and all my side projects and courses were all very much aimed at low level control and hardware.

Import.io started off as a company that wanted to build tools to allow developers and non-techies to extract data from the web. 

The product was hacky, buggy, slow.. you had to basically download a 10 year old browser for it to work, but it WORKED. 

## The Hype

Import.io was a hype machine, we had hired some extremely good marketing people and we were having tonnes of sign-ups, we went to several pitching events and WON! We had big releases at tech events, stands at smaller events, and people would crowd around the founders as they were showing off that we could do. People loved the product, we were the cool startup.

I look back on this part of the company and I loved it. It was new, it was fast, it was exciting.

However, at the time I realise I was probably hiding a lot of feelings that I had never experienced before.....

### Stupid Brain
Personally I did not really understand WHY we had so much hype. I'm a developer and I'm a very cynical person. It's amazing how sometimes your brain will try to reject feelings even if they are very positive. Self-doubt is real, imposter syndrome is a bitch. Was I really doing anything useful in this company? Was it everyone else around me? Was it the other guy who started at the same time as me who had way more experience at this sort of thing?

At times I really felt like I was not doing any of the "core work". I was the script kiddie sitting in the corner trying to get up to speed on all this new technology that we were using. I was debugging and fixing stuff in the backend that people did not see, lots of race conditions, simple one line code errors that bought the system down.. that kind of thing. University programming and real life are programming are uncomparable. My first few months of import were probably the most hard working time of my entire life, university was an absolute breeze in comparison. 

## The "Dark Summer"

-"We've signed up for this launch event in two weeks and we need to launch something"- un-named founder

The *"dark summer"* was a particular event at the start of import.io that I remember very well. It was definitely my biggest low. Everyone in the office felt it. The employees even gave it a name :)

We were a super hacky startup, we panicked A LOT and made some real poor technology choices. 
*PDD 'Panic Driven Development'* became a new programming technique.

Sometimes I argued with the founders (even the investors) over technology choices only to be shot down. 

Sometime I built something completely stupid that didn't work and ended up getting canned.

The *"dark summer"* happened because of many of the above reasons. The founders had gone off to the US to try and woo some of the biggest US investors, you can probably guess what happened..
At the time the developers and marketing team and I were in the London office and the founders had arranged a progress call to let us know how the fundraising was going. We were excited to hear news, we wanted to know that investors loved us too and wanted to throw money at us... Obviously this did not happen.

The founders called us in the UK office and essentially told us the product was not good enough, what we had built was poor quality, too hacky, too buggy. I dont think they meant to come across as blaming the team, but thats how I took it. 
I felt like I'd been personally blamed for a lot of the issues with the product (much of which I had never worked on and wasn't my responsibility, but I felt like I COULD have tried harder and helped out).

*I lost my shit* As soon as the call was over, I picked up my coat, I walked out of the office, I found the nearest park and lay down in the grass and stared at the sky for about 2 hours. I didn't come to work for the next week. I set up interviews for other companies.

After thinking about what had happened, I came to my senses and realised it was not all over. I set up a meeting with the CTO and apologised and just came clean about how I felt. 

I think the thing I learned from this is that its not entirely the founder's responsibility to keep the employees happy. The founders are also in the same position as you a lot of the time. They are probably feeling worse. They are probably having sleepless nights over the fact their employees are finding things hard. But when you are a startup, employees need to be tough, you can't expect the founders to be infallible.

Things go wrong, bad decisions will be made this is normal and its expected. You pick yourself up, and you do it again.

## Scary Competitor!

Things picked up after the dark summer, morale increased, we worked hard, the product improved, we fixed some of the bugs and we still kept getting loads of sign-ups.

Nevertheless, the product and UX was still awful.
* We built our own login system
    * Users had to type in a username before you could put in your password, so you couldn't tab to your password
    * Social sign in was built entirely by our own team, its alot of code to maintain, we should have used a 3rd party service.
    * We had no "remember me" button so users always had to sign up 

* The 10 year old embedded browser that you had to download
    * Did not work on macbooks (eventually we fixed this by fixing a bug in webkit and then distributing our own binary, dont do this)
    * Christ it was old
    * Barely supported modern JS.
    * Parts of the APIs it required kept getting deprecated, we kept having to rebuild it. 
    * So old.

Then a first competitor came along. A silicon valley startup with a very similar product to us, only it was so much easier to use, much prettier, must faster ... it was scary!

This is not necessarily a bad thing though. It validated to the business that what we were doing was not stupid. If many people have the same idea, and think they can make a company out of it then at least you are not stupid.

## Magic and Algorithms

Import.io's big advantage came about when we built the tool that came to be named "magic". 

"Magic" was probably my proudest achievement of working at import. I started thinking about how It might be possible to automate a specific part of the data extraction process.. namely detecting and extracting data from lists and tables.
There was no technology out there that could already do this that we knew about, and most papers around the subject that existed had very small curated datasets and used very proprietary and non web-based technology.

I spent a few months working on the first prototype versions of magic and it started to become quite an exciting peice of technology, we were demo-ing it to investors and new customers and we were getting the 'WOW!' moments we always dreamed of. Magic bought the hype back to import.io, investors were happy, we got another tranch of funding. I finally felt like I was part of the core technology and that I wasn't sitting around feeling like I didn't know what i was doing anymore.

We employed a few more people to work on magic and it just kept on improving. We had a real competitive edge! 

At this point the deep learning surge started kicking off and we hired a whole team of deep learning engineers and It was my job to be the lead of this new "Research and development" team.

## That awkward time we got evicted from our office .... 

It wasn't our fault, our head landlord was having a dispute with the sublet landlord who we were renting the space from. We turned up one morning and the locks had been changed. All our equipment still inside the office.
We managed to get our equipment back and found some temporary co-working space within a few weeks. We never went back to that old office. 

## Rebuild all the things!

Around this time, import had just recieved a pretty big chunk of series A funding and decided that we needed to re-build our entire product into a "data first" product where users would not even have to see the websites they were gathering data from, we would have this huge global database of all data sources and update it ourselves constantly, and let users just "choose the data sources they want".

Obviously this was a very ambitious and dramatic turn from the downloadable desktop product and the self-serve data model that we had been working on. But sometimes you really need to take a huge leap of faith and just "go with it". We hired a bunch of people to work on this new paradigm and progress was fast and hack-y again, but this time we were using much better technology and trying to avoid the downloadable tool and build everything within the browser.

We still were forced to use a few bits of aging technology, but it was the best that was out there at the time, so we went with it.

## The "Great purge"

As well as working on the algorithmic side of the business the company was also trying out several ways to make money, one of which was a large team of enterprise services work. Probably about a half of the company at this point was working on these bespoke projects to deliver data to big corporates.

Unfortunately at this point in time the business decided to pivot again, we were not hitting the numbers the company needed to survive. We didn't need a hype machine anymore, we needed a functioning business. The board introduced us to a new CEO that decided to move in a different direction. 

The outcome of this turmoil in the business was that there was a large number of layoffs, the business wanted to restructure. This was hard. Lots of people were obviously upset. We received a bunch of bad reviews on glassdoor. It was a really low time for employees that had been around for a long time.

Some of my closest colleagues were let go. It did not feel great.

## Rebuild all the things again!

As part of this large restructure of management and the business and it's goals as a whole, the "data first" product was canned. The tech team took what they could from what had been built and re-applied it all to the original model. The new CEO was convinced that the self-serve model was still the direction we could thrive in.

The tech got better, faster, far more maintainable, we even had charts and dev-ops. How we ever managed before without them I do not know, we should have had all these things from the start. You learn from your mistakes.

The system that was built around this time is the system still in place now, there was TONNES of technical debt because it was built very quickly, but most of that is gone now.

## Where did that competitor go?!

So it had been a few years and we basically learned that the competitor, even though they were a valley company with a much nice looking and easier to use product... got aquihired by palantir, and shortly after deprecated their entire product! They were gone! How? Why? 

A successful business is not all about how good the product is. There are so many more factors. Maybe this was what our competitor wanted to do all along? Maybe that was their aim? I guess we will never know.

Competitors come and go, the most important thing is that they exist. A good valuable market always has competition.

## Chainsaw 

Our Machine Learning and Algorithm team were making amazing progress. We developed a system that you could enter a URL of a list of items such as products, recipes etc.. and it would be able to completely automatically extract relevant parts of data, such as price, product names, categories etc, then it would drill down into the sub-pages of the list of items and gather more data... 

This was an awesome achievement that we thought was entirely groundbreaking and from a research point of view we had an amazing piece of technology. This bit of tech was internally named "chainsaw". 

It had issues.

As anyone in machine learning field knows, the algorithms are only as good as their data sets. Our data sets were OK, but they weren't perfect. We had a large amount of user curated data, we used open data on the internet for various semantic tagging etc... but it was all fairly inconsistent, the labels were sometimes in the wrong places, and web pages can be created in infinite numbers of ways, so the labelling vs the percieved dimensionality of the problem was not a perfect approach.

After almost 6 months to a year of working on this we were perhaps 60%-70% accurate, which when you are trying to sell as a product as an alternative to manually marking up pages perfectly (using the existing technology) is not really a viable option.

The business had to make a difficult decision.

## No More Magic

The business decided that it did not have the time or resources to keep pursuing the machine learning route. We were a small company with limited runway. We needed to concentrate on what we knew we could sell.

This lead to the end of chainsaw, it never reached production. The ML team (my team at the time) was mostly made redundant. I knew lots about the rest of the system and moved back to doing backend work.

I did this for another year or so, and the tech stack we have now makes me very confident. The company expanded it's operations largely into the US, and the product UX and design became infinitely better. The product that import.io has now is AWESOME, the team is fantastic and i'm really excited for the future of the company.

## The end (for me)

I really enjoyed my time at import and I have learned pretty much everything i know about tech and startups from working there. Sure there were some really crappy times, but I stuck with it, even when people who were great developers left to do other things, or were not enjoying it at all. Not everyone can cope in every environment and thats OK, we are all different people. 

I decided that after 5 and a half years, that I wanted a new experience and ultimately get back into the machine learning and algorithmic side of software. 

If you are thinking of joining a very early stage startup, be prepared for madness, instability and be aware that there are a large amount of unknown unknowns. Also be prepared to have a fantastically variable experience in which you will learn huge amounts about technology, learn huge amounts about yourself at the same time.

You will fail at stuff, you will succeed at other things. The company will probably have to make difficult decisions that you don't agree with, but you might make decisions in the company that are incredibly impactful too.

I want to wish everyone at import.io a great future and let them know it has been an absolute pleasure working there. And hope this post is an interesting view into the history of the company from my view as employee no 1.

## Good Luck Everyone at import.io!!!