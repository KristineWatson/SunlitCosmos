---
title: test3
date: 2025-01-03
type: post
slug: 
---
{{ $posts := where .Site.RegularPages "Type" "post" }}
{{ $allPosts := where $posts "Date" "ge" time.Unix 0 | sort "Date" "asc" }}
test3