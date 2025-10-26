import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function addPoweredBy(code: string): string {
  const brandingCode = `
var pb=document.createElement('div');
pb.style.cssText='position:fixed;bottom:10px;left:10px;font-size:10px;color:#999;z-index:999999;background:rgba(255,255,255,0.9);padding:4px 8px;border-radius:4px;font-family:Arial,sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.1)';
pb.innerHTML='<a href="https://ryady.com" target="_blank" style="color:#666;text-decoration:none">Powered by <strong style="color:#3B82F6">Ryady</strong></a>';
document.body.appendChild(pb);
`;
  return code + brandingCode;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const embedCode = url.pathname.split('/').pop();

    if (!embedCode) {
      return new Response('Missing embed code', {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
        },
      });
    }

    const { data: widgetInstance, error: instanceError } = await supabase
      .from('widget_instances')
      .select(`
        *,
        widgets:widget_id (
          *
        )
      `)
      .eq('embed_code', embedCode)
      .eq('is_active', true)
      .maybeSingle();

    if (instanceError || !widgetInstance) {
      return new Response('// Widget not found', {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/javascript',
        },
      });
    }

    await supabase
      .from('widget_instances')
      .update({
        view_count: (widgetInstance.view_count || 0) + 1,
        last_viewed_at: new Date().toISOString(),
      })
      .eq('id', widgetInstance.id);

    const widget = widgetInstance.widgets;
    let code = widget.generated_code || '';

    code = code.replace(/<script>/g, '').replace(/<\/script>/g, '');

    let isPro = false;
    if (widgetInstance.user_id) {
      const { data: proCheck } = await supabase.rpc('is_pro_user', {
        p_user_id: widgetInstance.user_id
      });
      isPro = proCheck || false;
    }

    if (!isPro) {
      code = addPoweredBy(code);
    }

    return new Response(code, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('// Internal server error', {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/javascript',
      },
    });
  }
});