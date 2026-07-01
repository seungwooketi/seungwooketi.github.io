---
layout: default
title: blog
permalink: /
home: true
---

{% comment %} Blueprint blog landing — structural rebuild (styles in \_sass/\_blueprint.scss). {% endcomment %}

<div class="bp-blog">

  <header class="bp-hero">
    <div class="bp-eyebrow">Writing &amp; Notes · Seungwoo Kum</div>
    <h1 class="bp-hero-title">Notes on industrial AI, edge intelligence, and trustworthy systems.</h1>
    <p class="bp-hero-lead">Research writing from the Director of the AI Data &amp; Security Research Center at KETI — foundation models for industry, agentic-AI security, and the data infrastructure underneath.</p>
    <div class="bp-hero-links">
      <a class="bp-btn" href="{{ '/about/' | relative_url }}">About &amp; research →</a>
      <a class="bp-chip" href="mailto:seungwoo.kum@gmail.com">Email</a>
      <a class="bp-chip" href="https://github.com/seungwooketi">GitHub</a>
      <a class="bp-chip" href="https://scholar.google.com/citations?user=8DEsYMsAAAAJ">Scholar</a>
    </div>
  </header>

{% assign posts = site.posts %}
{% assign featured = posts | first %}

{% if featured %}
<a class="bp-featured" href="{{ featured.url | relative_url }}">

<div class="bp-featured-body">
<div class="bp-kicker">◆ Latest</div>
<h2 class="bp-featured-title">{{ featured.title }}</h2>
<p class="bp-featured-desc">{{ featured.description }}</p>
{% assign f_read = featured.content | number_of_words | divided_by: 180 | plus: 1 %}
<div class="bp-meta">{{ f_read }} min read &nbsp;·&nbsp; {{ featured.date | date: "%B %d, %Y" }}</div>
</div>
{% if featured.thumbnail %}
<div class="bp-featured-thumb"><img src="{{ featured.thumbnail | relative_url }}" alt="{{ featured.title | escape }}"></div>
{% endif %}
</a>
{% endif %}

  <div class="bp-sec">
    <h3 class="bp-sec-title">All writing</h3>
    <span class="bp-sec-count">{{ posts | size }} posts</span>
  </div>

  <ul class="bp-postlist">
    {% for post in posts offset:1 %}
    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    <li>
      <a class="bp-postrow" href="{{ post.url | relative_url }}">
        <div class="bp-postrow-date">
          <span class="bp-date">{{ post.date | date: "%b %d, %Y" }}</span>
          <span class="bp-read">~{{ read_time }} min</span>
        </div>
        <div class="bp-postrow-main">
          <div class="bp-postrow-title">{{ post.title }}</div>
          {% if post.description %}<p class="bp-postrow-desc">{{ post.description }}</p>{% endif %}
          {% if post.tags.size > 0 %}
          <div class="bp-tags">{% for t in post.tags %}<span class="bp-tag">#{{ t }}</span>{% endfor %}</div>
          {% endif %}
        </div>
      </a>
    </li>
    {% endfor %}
  </ul>

  <div class="bp-sec bp-sec-plain"><span class="bp-sec-eyebrow">Elsewhere on this site</span></div>
  <div class="bp-explore">
    <a class="bp-ex" href="{{ '/about/' | relative_url }}"><span class="bp-ex-n">01</span><span class="bp-ex-t">About</span><span class="bp-ex-d">Role, research, focus</span></a>
    <a class="bp-ex" href="{{ '/publications/' | relative_url }}"><span class="bp-ex-n">02</span><span class="bp-ex-t">Publications</span><span class="bp-ex-d">Papers by year</span></a>
    <a class="bp-ex" href="{{ '/projects/' | relative_url }}"><span class="bp-ex-n">03</span><span class="bp-ex-t">Projects</span><span class="bp-ex-d">Flagship R&amp;D</span></a>
    <a class="bp-ex" href="{{ '/cv/' | relative_url }}"><span class="bp-ex-n">04</span><span class="bp-ex-t">CV</span><span class="bp-ex-d">Career &amp; education</span></a>
  </div>

</div>
