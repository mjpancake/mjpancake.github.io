---
layout: page
title: 人物编辑范例
permalink: /docs/editor/examples/
---

（本文施工中，最后更新于 2018年 4月 2日）

## 杏果 0.9.4

```lua
mkByCt = {
  [0] = 0,
  [1] = 40,
  [2] = 140,
  [3] = 0,
  [4] = 0,
}

function ondraw()
  if who ~= self or rinshan then
    return
  end
  
  local closed = game:gethand(self):closed()
  for _, t in ipairs(T34.all) do
    mount:lighta(t, mkByCt[closed:ct(t)])
  end
end
```

直向手的本质就是容易摸到已经摸到的牌，
从而形成对子和暗刻。
我们通过`mkByCt`表示对不同数量的已有手牌的吸引强度。
对于已有一张的牌，以 40 毫兔吸引，
对于已有两张的牌，以 140 毫兔吸引，
而对于没有的、有三张的、有四张的，则以 0 毫兔放着不管。

在`ondraw`函数中，我们先排除了他家摸牌和岭上牌的情况。
接着，遍历全部 34 种牌，
根据手中 closed （除副露以外的）部分中含有该种牌的数量去获取对应的毫兔值，
并干涉牌山 A 区。

<br />

## 和 0.9.4

```lua
function ondraw()
  if who ~= self or rinshan then
    return
  end
  
  local hand = game:gethand(self)
  local step4 = hand:step4()
  local step7 = hand:step7()
  
  local mk = step4 == 1 and 100 or 200
  if step4 == 1 or step7 == 2 or step7 == 1 then
    for _, t in ipairs(hand:effa4()) do
      mount:lighta(t, mk)
    end
  end
end
```


