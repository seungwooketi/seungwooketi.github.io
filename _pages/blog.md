---
layout: default
title: blog
permalink: /
home: true
---

{% comment %} Unified blog — EN/KO toggle {% endcomment %}

<div class="bp-blog">

<div class="bp-lang-switch">
  <button class="bp-lang-btn" id="btn-en" onclick="blogSetLang('en')">EN</button>
  <span class="bp-lang-divider">|</span>
  <button class="bp-lang-btn" id="btn-ko" onclick="blogSetLang('ko')">한국어</button>
</div>

<!-- ===== ENGLISH ===== -->
<div id="blog-en">

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

{% assign en_posts = site.posts %}
{% assign en_featured = en_posts | first %}

{% if en_featured %}
<a class="bp-featured" href="{{ en_featured.url | relative_url }}">

<div class="bp-featured-body">
<div class="bp-kicker">◆ Latest</div>
<h2 class="bp-featured-title">{{ en_featured.title }}</h2>
<p class="bp-featured-desc">{{ en_featured.description }}</p>
{% assign f_read = en_featured.content | number_of_words | divided_by: 180 | plus: 1 %}
<div class="bp-meta">{{ f_read }} min read &nbsp;·&nbsp; {{ en_featured.date | date: "%B %d, %Y" }}</div>
</div>
{% if en_featured.thumbnail %}
<div class="bp-featured-thumb"><img src="{{ en_featured.thumbnail | relative_url }}" alt="{{ en_featured.title | escape }}"></div>
{% endif %}
</a>
{% endif %}

  <div class="bp-sec">
    <h3 class="bp-sec-title">All writing</h3>
    <span class="bp-sec-count">{{ en_posts | size }} posts</span>
  </div>

  <ul class="bp-postlist">
    {% for post in en_posts offset:1 %}
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

</div><!-- #blog-en -->

<!-- ===== KOREAN ===== -->
<div id="blog-ko" style="display:none">

  <header class="bp-hero">
    <div class="bp-eyebrow">글과 노트 · 금승우</div>
    <h1 class="bp-hero-title">산업 AI와 신뢰할 수 있는 시스템에 대한 기록.</h1>
    <p class="bp-hero-lead">산업 파운데이션 모델, 에이전틱 AI 보안, 그리고 그 아래를 받치는 데이터 인프라에 대한 연구 노트.</p>
    <div class="bp-hero-links">
      <a class="bp-btn" href="{{ '/about/' | relative_url }}">소개 &amp; 연구 →</a>
      <a class="bp-chip" href="mailto:seungwoo.kum@gmail.com">이메일</a>
      <a class="bp-chip" href="https://github.com/seungwooketi">GitHub</a>
      <a class="bp-chip" href="https://scholar.google.com/citations?user=8DEsYMsAAAAJ">Scholar</a>
    </div>
  </header>

{% assign ko_posts = site.ko | where_exp: "post", "post.published != false" | sort: "date" | reverse %}
{% assign ko_featured = ko_posts | first %}

{% if ko_featured %}
<a class="bp-featured" href="{{ ko_featured.url | relative_url }}">

<div class="bp-featured-body">
<div class="bp-kicker">◆ 최신</div>
<h2 class="bp-featured-title">{{ ko_featured.title }}</h2>
<p class="bp-featured-desc">{{ ko_featured.description }}</p>
{% assign f_read = ko_featured.content | number_of_words | divided_by: 180 | plus: 1 %}
<div class="bp-meta">{{ f_read }}분 분량 &nbsp;·&nbsp; {{ ko_featured.date | date: "%Y년 %m월 %d일" }}</div>
</div>
{% if ko_featured.thumbnail %}
<div class="bp-featured-thumb"><img src="{{ ko_featured.thumbnail | relative_url }}" alt="{{ ko_featured.title | escape }}"></div>
{% endif %}
</a>
{% else %}
<div class="bp-empty-notice">한국어 포스트를 준비 중입니다.</div>
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
    <a class="bp-ex" href="{{ '/about/' | relative_url }}"><span class="bp-ex-n">01</span><span class="bp-ex-t">소개</span><span class="bp-ex-d">역할 · 연구 · 관심사</span></a>
    <a class="bp-ex" href="{{ '/publications/' | relative_url }}"><span class="bp-ex-n">02</span><span class="bp-ex-t">논문</span><span class="bp-ex-d">연도별 목록</span></a>
    <a class="bp-ex" href="{{ '/projects/' | relative_url }}"><span class="bp-ex-n">03</span><span class="bp-ex-t">프로젝트</span><span class="bp-ex-d">주요 R&amp;D</span></a>
    <a class="bp-ex" href="{{ '/cv/' | relative_url }}"><span class="bp-ex-n">04</span><span class="bp-ex-t">CV</span><span class="bp-ex-d">경력 · 학력</span></a>
  </div>

</div><!-- #blog-ko -->

</div><!-- .bp-blog -->

<style>
.bp-lang-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  justify-content: flex-end;
}
.bp-lang-btn {
  background: none;
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 0.2rem 0.8rem;
  font-size: 0.82rem;
  cursor: pointer;
  opacity: 0.35;
  color: inherit;
  transition: opacity 0.15s;
}
.bp-lang-btn.active {
  opacity: 1;
  font-weight: 600;
}
.bp-lang-divider { opacity: 0.25; font-size: 0.85rem; }
.bp-empty-notice {
  color: var(--global-text-color-light, #888);
  font-size: 0.95rem;
  margin: 2rem 0 1rem;
  padding: 1.5rem;
  border: 1px dashed currentColor;
  border-radius: 6px;
  text-align: center;
  opacity: 0.6;
}
</style>

<script>
(function () {
  function setLang(lang) {
    document.getElementById('blog-en').style.display = lang === 'en' ? '' : 'none';
    document.getElementById('blog-ko').style.display = lang === 'ko' ? '' : 'none';
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-ko').classList.toggle('active', lang === 'ko');
    try { localStorage.setItem('blog-lang', lang); } catch (e) {}
  }
  window.blogSetLang = setLang;
  document.addEventListener('DOMContentLoaded', function () {
    var saved = '';
    try { saved = localStorage.getItem('blog-lang') || ''; } catch (e) {}
    // Auto-detect browser language if no saved preference
    if (!saved) {
      var browserLang = navigator.language || navigator.userLanguage || 'en';
      saved = browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
    }
    setLang(saved);
  });
})();
</script>
