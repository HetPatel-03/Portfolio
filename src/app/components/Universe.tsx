import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationNodeDatum } from 'd3-force';

type NodeType = 'center' | 'category' | 'sub' | 'leaf';

interface Node {
  id: string;
  label: string;
  type: NodeType;
  parent?: string;
  color: string;
  size: number;
  description?: string;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  type: NodeType;
  parent?: string;
  color: string;
  size: number;
  label: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

interface SceneNode {
  data: Node;
  root: THREE.Object3D;
  mesh: THREE.Mesh;
}

const CAT_RADIUS = 80;
const SUB_RADIUS = 38;
const LEAF_RADIUS = 18;

function fibonacciSpherePoints(count: number, radius: number): THREE.Vector3[] {
  if (count <= 1) return [new THREE.Vector3(0, 0, radius)];
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

export function Universe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsLayerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number>(0);

  const nodes = useMemo<Node[]>(() => {
    const base: Node[] = [
      { id: 'het', label: 'Het Patel', type: 'center', color: '#F2664A', size: 42 },
      { id: 'education', label: 'Education', type: 'category', parent: 'het', color: '#C8F135', size: 16 },
      { id: 'experience', label: 'Experience', type: 'category', parent: 'het', color: '#60A5FA', size: 16 },
      { id: 'startups', label: 'Startups', type: 'category', parent: 'het', color: '#FBBF24', size: 16 },
      { id: 'projects', label: 'Projects', type: 'category', parent: 'het', color: '#A78BFA', size: 16 },
      { id: 'skills', label: 'Skills', type: 'category', parent: 'het', color: '#2DD4BF', size: 16 },
      { id: 'achievements', label: 'Achievements', type: 'category', parent: 'het', color: '#F59E0B', size: 16 },
      { id: 'languages', label: 'Languages', type: 'category', parent: 'het', color: '#F9A8D4', size: 16 },
      { id: 'location', label: 'Location', type: 'category', parent: 'het', color: '#86EFAC', size: 16 },
      { id: 'presence', label: 'Presence', type: 'category', parent: 'het', color: '#94A3B8', size: 16 },
      { id: 'learning', label: 'Currently Learning', type: 'category', parent: 'het', color: '#FB923C', size: 16 },
    ];

    const subGroups: Record<string, string[]> = {
      education: ["CS Degree", 'CS50x', 'CS50W', 'Microsoft 365', "Dean's List 2023", "Dean's List 2024"],
      experience: ['Rogers Communications', 'Freelance', 'Staples Canada', 'Walmart Canada'],
      startups: ['StudenzBit', 'RecurList', 'Digifixr'],
      projects: ['StudenzBit', 'RecurList', 'Laundry Mgmt', 'FIXXO'],
      skills: ['Frontend', 'Backend', 'Database', 'DevOps'],
      achievements: ['Top 150 Canada', 'Top 3 GTA', 'Top Seller Rogers', 'Acting Manager', "Dean's List"],
      languages: ['English', 'Hindi', 'Gujarati'],
      location: ['Brampton ON', 'GTA Wide', 'Remote', 'Open to Relocation'],
      presence: ['GitHub', 'LinkedIn', 'X', 'hetppatel.dev'],
      learning: ['AWS', 'System Design', 'NeetCode 150', 'React Native'],
    };

    Object.entries(subGroups).forEach(([categoryId, labels]) => {
      labels.forEach((label) => {
        base.push({
          id: `sub-${categoryId}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          label,
          type: 'sub',
          parent: categoryId,
          color: '#A8A8B8',
          size: 8,
        });
      });
    });

    const leafGroups: Record<string, string[]> = {
      'sub-skills-frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind', 'D3.js'],
      'sub-skills-backend': ['Node.js', 'Express', 'Python', 'REST APIs'],
      'sub-skills-database': ['PostgreSQL', 'Supabase', 'MongoDB'],
      'sub-skills-devops': ['Docker', 'Vercel', 'Git', 'GitHub Actions'],
    };

    Object.entries(leafGroups).forEach(([parent, labels]) => {
      labels.forEach((label) => {
        base.push({
          id: `leaf-${parent}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          label,
          type: 'leaf',
          parent,
          color: '#9CA3AF',
          size: 5,
        });
      });
    });

    return base;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !labelsLayerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const labelsLayer = labelsLayerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c10);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
    camera.position.set(0, 0, 240);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 50;
    controls.maxDistance = 380;

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    const categoryNodes = nodes.filter((n) => n.type === 'category');
    const childrenByParent = new Map<string, Node[]>();
    nodes.forEach((n) => {
      if (!n.parent) return;
      const list = childrenByParent.get(n.parent) ?? [];
      list.push(n);
      childrenByParent.set(n.parent, list);
    });

    const categoryTargets = fibonacciSpherePoints(categoryNodes.length, CAT_RADIUS);
    const initialPositions = new Map<string, THREE.Vector3>();
    initialPositions.set('het', new THREE.Vector3(0, 0, 0));
    categoryNodes.forEach((node, i) => {
      initialPositions.set(node.id, categoryTargets[i]);
    });

    categoryNodes.forEach((cat) => {
      const subs = (childrenByParent.get(cat.id) ?? []).filter((n) => n.type === 'sub');
      const subTargets = fibonacciSpherePoints(subs.length, SUB_RADIUS);
      const catPos = initialPositions.get(cat.id) ?? new THREE.Vector3();
      subs.forEach((sub, i) => {
        initialPositions.set(sub.id, catPos.clone().add(subTargets[i]));
      });
    });

    nodes
      .filter((n) => n.type === 'sub' && n.parent?.includes('skills'))
      .forEach((sub) => {
        const leaves = (childrenByParent.get(sub.id) ?? []).filter((n) => n.type === 'leaf');
        const leafTargets = fibonacciSpherePoints(leaves.length, LEAF_RADIUS);
        const subPos = initialPositions.get(sub.id) ?? new THREE.Vector3();
        leaves.forEach((leaf, i) => {
          initialPositions.set(leaf.id, subPos.clone().add(leafTargets[i]));
        });
      });

    const simNodes: SimNode[] = nodes.map((node) => {
      const p = initialPositions.get(node.id) ?? new THREE.Vector3();
      return {
        ...node,
        x: p.x,
        y: p.y,
        z: p.z,
        vx: 0,
        vy: 0,
        vz: 0,
        targetX: p.x,
        targetY: p.y,
        targetZ: p.z,
      };
    });

    const simLinks = nodes
      .filter((n) => n.parent)
      .map((n) => ({ source: n.parent as string, target: n.id }));

    const simulation = forceSimulation(simNodes)
      .force('charge', forceManyBody<SimNode>().strength(-45))
      .force(
        'link',
        forceLink<SimNode, { source: string | SimNode; target: string | SimNode }>(simLinks)
          .id((d) => d.id)
          .distance((d) => {
            const target = d.target as SimNode;
            if (target.type === 'category') return CAT_RADIUS;
            if (target.type === 'sub') return SUB_RADIUS;
            return LEAF_RADIUS;
          })
          .strength(0.25),
      )
      .force('collision', forceCollide<SimNode>().radius((d) => d.size + 4))
      .force('x', (alpha) => {
        simNodes.forEach((n) => {
          n.vx += (n.targetX - n.x) * 0.018 * alpha;
        });
      })
      .force('y', (alpha) => {
        simNodes.forEach((n) => {
          n.vy += (n.targetY - n.y) * 0.018 * alpha;
        });
      })
      .stop();

    for (let i = 0; i < 300; i += 1) {
      simulation.tick();
      simNodes.forEach((n) => {
        n.vz += (n.targetZ - n.z) * 0.02;
        n.vz *= 0.9;
        n.z += n.vz;
      });
    }

    const simById = new Map(simNodes.map((n) => [n.id, n]));
    const sceneNodesById = new Map<string, SceneNode>();
    const categoryMeshes: THREE.Mesh[] = [];
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];
    const lineObjects: THREE.Line[] = [];

    const textureLoader = new THREE.TextureLoader();

    simNodes.forEach((node) => {
      let root: THREE.Object3D;
      let mesh: THREE.Mesh;

      if (node.type === 'center') {
        const group = new THREE.Group();
        const geometry = new THREE.CircleGeometry(node.size, 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: node.id, type: node.type };
        textureLoader.load('/Me_Memoji_Laptop.png', (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.center.set(0.5, 0.5);
          tex.repeat.set(1, 1);
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          disposableTextures.push(tex);
          material.map = tex;
          material.needsUpdate = true;
          renderer.render(scene, camera);
        });

        const ringGeometry = new THREE.RingGeometry(44, 48, 64);
        disposableGeometries.push(ringGeometry);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xf2664a,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        disposableMaterials.push(ringMaterial);
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.position.z = 0.02;

        group.add(mesh);
        group.add(ringMesh);
        root = group;
      } else if (node.type === 'category') {
        const group = new THREE.Group();
        const r = node.size;
        const geometry = new THREE.CircleGeometry(r, 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: node.color,
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: node.id, type: node.type };

        const ringGeometry = new THREE.RingGeometry(r + 2, r + 5, 64);
        disposableGeometries.push(ringGeometry);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        disposableMaterials.push(ringMaterial);
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.position.z = 0.02;

        group.add(mesh);
        group.add(ringMesh);
        root = group;
        categoryMeshes.push(mesh);
      } else {
        const geometry = new THREE.CircleGeometry(node.size, 64);
        disposableGeometries.push(geometry);
        const material = new THREE.MeshBasicMaterial({
          color: node.color,
          side: THREE.DoubleSide,
          transparent: node.type === 'sub' || node.type === 'leaf',
          opacity: node.type === 'category' ? 1 : 0,
        });
        disposableMaterials.push(material);
        mesh = new THREE.Mesh(geometry, material);
        root = mesh;
        mesh.userData = { id: node.id, type: node.type };
      }

      root.position.set(node.x, node.y, node.z);
      mesh.visible = node.type === 'center' || node.type === 'category';
      graphGroup.add(root);
      sceneNodesById.set(node.id, { data: node, root, mesh });
    });

    simLinks.forEach((link) => {
      const parentId = link.source as string;
      const childId = link.target as string;
      const parentNode = simById.get(parentId);
      const childNode = simById.get(childId);
      if (!parentNode || !childNode) return;

      const pParent = new THREE.Vector3(parentNode.x, parentNode.y, parentNode.z);
      const pChild = new THREE.Vector3(childNode.x, childNode.y, childNode.z);
      const curve = new THREE.CatmullRomCurve3([pParent, pChild]);
      const curvePoints = curve.getPoints(1);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      disposableGeometries.push(lineGeometry);

      const parentColorHex = new THREE.Color(parentNode.color).getHex();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: parentColorHex,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        depthTest: false,
      });
      disposableMaterials.push(lineMaterial);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      lineObjects.push(line);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const scaleTargets = new Map<string, number>();
    nodes.forEach((n) => scaleTargets.set(n.id, 1));
    let hoveredCategoryId: string | null = null;
    let autoRotate = true;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const updateMouse = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const stopAutoRotate = () => {
      autoRotate = false;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        autoRotate = true;
      }, 4000);
    };

    controls.addEventListener('start', stopAutoRotate);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('mousemove', updateMouse);

    if (hintRef.current) {
      gsap.to(hintRef.current, { opacity: 0, delay: 3, duration: 0.7, ease: 'power1.out' });
    }

    const tmp = new THREE.Vector3();
    const world = new THREE.Vector3();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      controls.update();

      if (autoRotate) scene.rotation.y += 0.0008;

      sceneNodesById.forEach(({ root }) => {
        root.lookAt(camera.position);
      });

      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObjects(categoryMeshes, false);
      hoveredCategoryId = intersections.length > 0 ? (intersections[0].object.userData.id as string) : null;

      const cameraDistance = camera.position.length();
      let nearestCategoryId: string | null = null;
      if (cameraDistance >= 100 && cameraDistance <= 200) {
        let minDist = Number.POSITIVE_INFINITY;
        categoryMeshes.forEach((mesh) => {
          mesh.getWorldPosition(world);
          const dist = world.distanceTo(camera.position);
          if (dist < minDist) {
            minDist = dist;
            nearestCategoryId = mesh.userData.id as string;
          }
        });
      }

      sceneNodesById.forEach(({ data, mesh }) => {
        if (data.type === 'category') {
          scaleTargets.set(data.id, hoveredCategoryId === data.id ? 1.2 : 1);
        }

        if (data.type === 'sub' || data.type === 'leaf') {
          const material = mesh.material as THREE.MeshBasicMaterial;
          let targetOpacity = 0;
          let shouldBeVisible = false;

          if (data.type === 'sub') {
            if (cameraDistance > 350) {
              shouldBeVisible = false;
            } else if (cameraDistance > 200) {
              shouldBeVisible = true;
              targetOpacity = 0.25;
            } else if (cameraDistance > 100) {
              shouldBeVisible = true;
              targetOpacity = data.parent === nearestCategoryId ? 1 : 0.3;
            } else {
              shouldBeVisible = true;
              targetOpacity = data.parent === nearestCategoryId ? 1 : 0.4;
            }
            if (hoveredCategoryId && data.parent === hoveredCategoryId) {
              shouldBeVisible = true;
              targetOpacity = Math.max(targetOpacity, 0.3);
            }
          }

          if (data.type === 'leaf') {
            shouldBeVisible = cameraDistance < 100;
            targetOpacity = shouldBeVisible ? 1 : 0;
          }

          mesh.visible = shouldBeVisible;
          material.opacity += (targetOpacity - material.opacity) * 0.12;
        }
      });

      sceneNodesById.forEach(({ data, root }) => {
        const target = scaleTargets.get(data.id) ?? 1;
        const next = THREE.MathUtils.lerp(root.scale.x, target, 0.15);
        root.scale.set(next, next, next);
      });

      nodes.forEach((node) => {
        const label = labelRefs.current[node.id];
        const sceneNode = sceneNodesById.get(node.id);
        if (!label || !sceneNode) return;

        sceneNode.mesh.getWorldPosition(tmp);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-tmp.y * 0.5 + 0.5) * container.clientHeight;
        const visible = tmp.z >= -1 && tmp.z <= 1 && sceneNode.mesh.visible;

        label.style.display = visible ? 'block' : 'none';
        if (!visible) return;

        label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        let blur = 4;
        let opacity = 0.4;

        if (node.type === 'category') {
          if (cameraDistance <= 350) {
            blur = 0;
            opacity = 1;
          }
          if (cameraDistance > 350) {
            blur = 4;
            opacity = 0.4;
          }
          if (hoveredCategoryId === node.id) {
            blur = 0;
            opacity = 1;
          }
        } else if (node.type === 'sub') {
          if (cameraDistance <= 200) {
            blur = 0;
            opacity = 0.85;
          }
          if (cameraDistance < 100) {
            blur = 0;
            opacity = 1;
          }
        } else if (node.type === 'leaf') {
          if (cameraDistance < 100) {
            blur = 0;
            opacity = 0.8;
          }
        }

        label.style.filter = `blur(${blur}px)`;
        label.style.opacity = `${opacity}`;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      controls.removeEventListener('start', stopAutoRotate);
      controls.dispose();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', updateMouse);
      simulation.stop();

      lineObjects.forEach((l) => scene.remove(l));
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [nodes]);

  return (
    <section id="universe" className="section-bg-universe relative py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)' }}>
          // 02 · universe
        </p>

        <h2
          className="text-[52px] mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-1px',
          }}
        >
          The full picture.
        </h2>

        <p className="text-[13px] mb-12" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Click any node to explore · Drag to rearrange.
        </p>

        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '700px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#0C0C10',
            position: 'relative',
          }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          <div
            ref={labelsLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {nodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => {
                  labelRefs.current[node.id] = el;
                }}
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  whiteSpace: 'nowrap',
                  filter: 'blur(4px)',
                  opacity: 0.4,
                  color: node.type === 'category' ? node.color : '#A8A8B8',
                  fontFamily: node.type === 'category' ? 'Clash Display, sans-serif' : 'DM Sans',
                  fontSize: node.type === 'category' ? '13px' : '10px',
                  fontWeight: node.type === 'category' ? 700 : 500,
                  transition: 'opacity 0.2s ease, filter 0.2s ease',
                }}
              >
                {node.label}
              </div>
            ))}
          </div>
          <div
            ref={hintRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 3,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#A8A8B8',
              fontSize: '11px',
              opacity: 1,
            }}
          >
            hover to discover · click to explore
          </div>
        </div>
      </div>
    </section>
  );
}