---
title: Getting Cloud Networking into your Head
type: post
date: 2024-07-05
tags: ["aws", "devops", "cloud", "azure", "devopsdays", "kcdc", "presentation"]
authors: [garo]
---

## Getting Cloud Networking into your Head

This year I had the privilege of presenting my perspective on cloud networking to two conferences: [DevOpsDays Austin 2024](https://devopsdays.org/events/2024-austin/welcome/) and [KCDC 2024](https://kcdc24.sessionize.com/). This talk is an analysis of a LOT of [psychic debugging](https://devblogs.microsoft.com/oldnewthing/20050321-00/?p=36123) situations I had resolved where the onlookers were genuinely surprised that I was able to diagnose the problem and suggest a solution that usually worked (or at least got them closer to working). Most of the time, especially in cloud environments, the issue was networking related. Even in non-cloud environments, it was usually a network issue that the developer hadn't considered. What I was doing was "software whispering" and for the uninitiated, it felt like magic. However, I don't like being a magician (or an illusionist) so I thought this talk would help codify some of my thinking to make it easier for others to peek behind the curtain.

The story goes like this: a developer is working in a cloud environment and something goes horribly wrong. It's probably a [`502 Bad Gateway`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) or something similar. The developers throws up their hands and says "it's broken, what do I do?" and tries to get some help. If they had a better working knowledge of their cloud network environment, they could do some initial troubleshooting to nail down the problem a little better and get some more logs or hints as to the culprit. Then, they can submit a ticket to the correct queue to start getting it solved. If they didn't, they would wait two days for the response to come back from the firewall team: configuration looks good here, closing ticket.

## Networking Mental Model

In my talk last year about getting the cloud in your head, I introduced the idea of "mental models" that built on [Bloom's Taxonomy](https://bloomstaxonomy.net/) (a framework for learning used by teachers for almost 70 years: published in 1956). The simpler, revised taxonomy was published in 2001 and is what I referenced in that presentation and this one. To learn something new, you must first "remember": recall facts and basic concepts using vocabulary, and then "understand": explain ideas or concepts in your own words.

Developers need to learn the foundations of cloud networking: Virtual Networks, Virtual Private Cloud, Subnets, Routes, Firewalls and so on for their environment. A typical cloud network environment may look like this:

![typical-cloud-network-diagram](getting-cloud-networking-into-your-head.assets/typical-cloud-network-diagram.png)
