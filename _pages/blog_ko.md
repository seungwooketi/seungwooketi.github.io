---
layout: default
title: Blog(KR)
permalink: /blog/ko/
lang: ko
nav: true
nav_order: 7
---

{% comment %} Blueprint 블로그(한국어) — blog.md와 동일한 구조. {% endcomment %}

<div class="bp-blog">

  <header class="bp-hero">
    <div class="bp-eyebrow">글과 노트 · 금승우</div>
    <h1 class="bp-hero-title">산업 AI와 신뢰할 수 있는 시스템에 대한 기록.</h1>
    <p class="bp-hero-lead">KETI 인공지능데이터보안연구센터장의 연구 노트 — 산업 파운데이션 모델, 에이전틱 AI 보안, 그리고 그 아래의 데이터 인프라.</p>
    <div class="bp-hero-links">
      <a class="bp-btn" href="{{ '/about/' | relative_url }}">소개 &amp; 연구 →</a>
      <a class="bp-chip" href="mailto:seungwoo.kum@gmail.com">이메일</a>
      <a class="bp-chip" href="https://github.com/seungwooketi">GitHub</a>
      <a class="bp-chip" href="https://scholar.google.com/citations?user=8DEsYMsAAAAJ">Scholar</a>
    </div>
  </header>

{% assign ko_posts = site.ko | where_exp: "post", "post.published != false" | sort: "date" | reverse %}
{% assign featured = ko_posts | first %}

{% if featured %}
<a class="bp-featured" href="{{ featured.url | relative_url }}">

<div class="bp-featured-body">
<div class="bp-kicker">◆ 최신</div>
<h2 class="bp-featured-title">{{ featured.title }}</h2>
<p class="bp-featured-desc">{{ featured.description }}</p>
{% assign f_read = featured.content | number_of_words | divided_by: 180 | plus: 1 %}
<div class="bp-meta">{{ f_read }}분 분량 &nbsp;·&nbsp; {{ featured.date | date: "%Y년 %m월 %d일" }}</div>
</div>
{% if featured.thumbnail %}
<div class="bp-featured-thumb"><img src="{{ featured.thumbnail | relative_url }}" alt="{{ featured.title | escape }}"></div>
{% endif %}
</a>
{% endif %}

  <div class="bp-sec">
    <h3 class="bp-sec-title">모든 글</h3>
    <span class="bp-sec-count">{{ ko_posts | size }}편</span>
  </div>

  <ul class="bp-postlist">
    {% for post in ko_posts offset:1 %}
    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    <li>
      <a class="bp-postrow" href="{{ post.url | relative_url }}">
        <div class="bp-postrow-date">
          <span class="bp-date">{{ post.date | date: "%Y.%m.%d" }}</span>
          <span class="bp-read">~{{ read_time }}분</span>
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

  <div class="bp-sec bp-sec-plain"><span class="bp-sec-eyebrow">이 사이트의 다른 곳</span></div>
  <div class="bp-explore">
    <a class="bp-ex" href="{{ '/' | relative_url }}"><span class="bp-ex-n">01</span><span class="bp-ex-t">English blog</span><span class="bp-ex-d">영문 글 전체</span></a>
    <a class="bp-ex" href="{{ '/about/' | relative_url }}"><span class="bp-ex-n">02</span><span class="bp-ex-t">소개</span><span class="bp-ex-d">역할 · 연구 · 관심사</span></a>
    <a class="bp-ex" href="{{ '/publications/' | relative_url }}"><span class="bp-ex-n">03</span><span class="bp-ex-t">논문</span><span class="bp-ex-d">연도별 목록</span></a>
    <a class="bp-ex" href="{{ '/projects/' | relative_url }}"><span class="bp-ex-n">04</span><span class="bp-ex-t">프로젝트</span><span class="bp-ex-d">주요 R&amp;D</span></a>
  </div>

</div>
