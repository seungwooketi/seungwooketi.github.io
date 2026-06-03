---
layout: default
title: Blog(KR)
permalink: /blog/ko/
lang: ko
nav: true
nav_order: 7
---

<div class="post">

  <div class="header-bar">
    <h1>노트와 생각</h1>
    <h2>AI 데이터 플랫폼, 엣지 인텔리전스, 그리고 그 과정에서 만든 연구 도구들에 대한 한국어 기록.</h2>
  </div>

  {% assign ko_posts = site.ko | where_exp: "post", "post.published != false" | sort: "date" | reverse %}

  {% comment %} Collect the set of tags used by Korean posts {% endcomment %}
  {% assign ko_tags = "" | split: "" %}
  {% for post in ko_posts %}
    {% for tag in post.tags %}
      {% assign ko_tags = ko_tags | push: tag %}
    {% endfor %}
  {% endfor %}
  {% assign ko_tags = ko_tags | uniq | sort %}

  {% if ko_tags.size > 0 %}
  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in ko_tags %}
      <li>
        <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/ko/tag/' | relative_url }}">{{ tag }}</a>
      </li>
      {% unless forloop.last %}
      <p>&bull;</p>
      {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  <ul class="post-list">
    {% for post in ko_posts %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% assign year = post.date | date: "%Y" %}
      {% assign tags = post.tags | join: "" %}

      <li>
        <h3>
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p>{{ post.description }}</p>
        <p class="post-meta">
          {{ read_time }}분 분량 &nbsp; &middot; &nbsp;
          {{ post.date | date: "%Y년 %m월 %d일" }}
        </p>
        <p class="post-tags">
          <a href="{{ year | prepend: '/blog/ko/' | prepend: site.baseurl }}">
            <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}</a>

          {% if tags != "" %}
          &nbsp; &middot; &nbsp;
          {% for tag in post.tags %}
          <a href="{{ tag | slugify | prepend: '/blog/ko/tag/' | prepend: site.baseurl }}">
            <i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}</a>
            {% unless forloop.last %}
            &nbsp;
            {% endunless %}
          {% endfor %}
          {% endif %}
        </p>
      </li>
    {% endfor %}
  </ul>

</div>
